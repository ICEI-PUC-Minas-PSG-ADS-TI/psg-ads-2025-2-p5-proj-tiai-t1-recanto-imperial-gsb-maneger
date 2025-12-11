import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";

import { AveApi, type AveDto } from "./api/avesApi";
import CruzamentoApi, {
  type CruzamentoDto,
} from "./api/cruzamentoApi";

/** ===== Tipos auxiliares do front ===== **/

interface AveGenealogia extends AveDto {} // vamos acessar paiId/maeId via "as any"

type CruzamentoRow = {
  id: string;
  macho: string;      // nome do pai
  femea: string;      // nome da mãe
  data: string;       // yyyy-MM-dd
  observacao: string;
};

export default function RelatorioExportacao() {
  /** ================= 1) TABELA DE AVES ================= */

  const [aves, setAves] = useState<AveGenealogia[]>([]);
  const [carregandoAves, setCarregandoAves] = useState(false);
  const [buscaAves, setBuscaAves] = useState("");

  useEffect(() => {
    async function carregarAves() {
      try {
        setCarregandoAves(true);
        const lista = (await AveApi.listar()) as AveGenealogia[];
        setAves(lista);
      } catch (err) {
        console.error("Erro ao carregar aves no relatório:", err);
        alert("Erro ao carregar a tabela de aves no relatório.");
      } finally {
        setCarregandoAves(false);
      }
    }
    carregarAves();
  }, []);

  const avesFiltradas = useMemo(() => {
    const q = normalize(buscaAves);
    if (!q) return aves;
    return aves.filter((a) =>
      [a.anilha, a.nome, a.linhagem, a.sexo, a.statusDescricao]
        .filter(Boolean)
        .some((v) => normalize(String(v)).includes(q))
    );
  }, [aves, buscaAves]);

  function exportAvesPDF() {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Tabela de Aves - Recanto Imperial GSB", 14, 18);

    const headers = ["Id", "Anilha", "Nome", "Linhagem", "Sexo", "Status"];
    const rows = avesFiltradas.map((a) => [
      String(a.id),
      a.anilha,
      a.nome,
      a.linhagem,
      a.sexo ?? "",
      a.statusDescricao ?? "",
    ]);

    (doc as any).autoTable({
      head: [headers],
      body: rows,
      startY: 24,
    });

    doc.save("tabela_aves.pdf");
  }

  /** ================= 2) HISTÓRICO DE CRUZAMENTOS ================= */

  const [cruzamentosOrig, setCruzamentosOrig] = useState<CruzamentoDto[]>([]);
  const [cruzamentos, setCruzamentos] = useState<CruzamentoRow[]>([]);
  const [carregandoCruz, setCarregandoCruz] = useState(false);
  const [buscaCruz, setBuscaCruz] = useState("");

  useEffect(() => {
    async function carregarCruz() {
      try {
        setCarregandoCruz(true);
        const itens = await CruzamentoApi.listar();
        setCruzamentosOrig(itens);
        const mapped = itens.map(mapToCruzamentoRow);
        setCruzamentos(mapped);
      } catch (err) {
        console.error("Erro ao carregar cruzamentos no relatório:", err);
        alert("Erro ao carregar histórico de cruzamentos no relatório.");
      } finally {
        setCarregandoCruz(false);
      }
    }
    carregarCruz();
  }, []);

  const cruzFiltrados = useMemo(() => {
    const q = normalize(buscaCruz);
    if (!q) return cruzamentos;
    return cruzamentos.filter((c) =>
      [c.macho, c.femea, c.data, c.observacao]
        .filter(Boolean)
        .some((v) => normalize(String(v)).includes(q))
    );
  }, [cruzamentos, buscaCruz]);

  function exportCruzPDF() {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Histórico de Cruzamentos - Recanto Imperial GSB", 14, 18);

    const headers = ["Macho (Pai)", "Fêmea (Mãe)", "Data", "Observação"];
    const rows = cruzFiltrados.map((c) => [
      c.macho,
      c.femea,
      formatBR(c.data),
      c.observacao,
    ]);

    (doc as any).autoTable({
      head: [headers],
      body: rows,
      startY: 24,
      styles: { cellWidth: "wrap" },
      columnStyles: {
        3: { cellWidth: 80 },
      },
    });

    doc.save("historico_cruzamentos.pdf");
  }

  /** ================= 3) ÁRVORE GENEALÓGICA ================= */

  const [buscaArvore, setBuscaArvore] = useState("");
  const [selecionada, setSelecionada] = useState<string>("");
  const [arvore, setArvore] = useState<string[][]>([]);

  useEffect(() => {
    if (!buscaArvore.trim()) {
      setSelecionada("");
      setArvore([]);
      return;
    }

    const termo = normalize(buscaArvore);

    const base =
      aves.find((a) => normalize(a.nome).includes(termo)) ||
      aves.find((a) => normalize(a.anilha).includes(termo)) ||
      aves.find((a) => String(a.id) === buscaArvore.trim());

    if (!base) {
      setSelecionada("");
      setArvore([]);
      return;
    }

    setSelecionada(`${base.anilha} - ${base.nome}`);

    // ✅ agora a árvore usa também os cruzamentos para achar pai/mãe
    const tree = buildTreeFromAve(base, aves, cruzamentosOrig);
    setArvore(tree);
  }, [buscaArvore, aves, cruzamentosOrig]);

  function onBuscarArvore(e: FormEvent) {
    e.preventDefault();
  }

  function exportArvorePDF() {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Árvore Genealógica - Recanto Imperial GSB", 14, 18);

    if (selecionada) {
      doc.setFontSize(11);
      doc.text(`Ave selecionada: ${selecionada}`, 14, 26);
    }

    const headers = ["Nível", "Descrição"];
    const rows = arvore.flatMap((nivel, idx) =>
      nivel.map((lbl) => [String(idx + 1), lbl])
    );

    (doc as any).autoTable({
      head: [headers],
      body: rows,
      startY: 32,
      styles: { cellWidth: "wrap" },
      columnStyles: { 1: { cellWidth: 150 } },
    });

    doc.save("arvore_genealogica.pdf");
  }

  /** ================= RENDER ================= */

  return (
    <div className="space-y-12">
      {/* ========= 1) TABELA DE AVES ========= */}
      <Card>
        <SectionHeader title="TABELA DE AVES">
          <SearchBox
            value={buscaAves}
            onChange={setBuscaAves}
            placeholder="Buscar por nome, anilha, linhagem..."
          />
        </SectionHeader>

        <TableWrapper>
          <table className="w-full text-left">
            <thead className="bg-amber-200/70">
              <tr className="text-stone-900">
                <Th>ID</Th>
                <Th>ANILHA</Th>
                <Th>NOME</Th>
                <Th>LINHAGEM</Th>
                <Th>SEXO</Th>
                <Th>STATUS</Th>
              </tr>
            </thead>
            <tbody>
              {carregandoAves && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-stone-500">
                    Carregando aves...
                  </td>
                </tr>
              )}

              {!carregandoAves &&
                avesFiltradas.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-amber-100 last:border-0"
                  >
                    <Td>{a.id}</Td>
                    <Td>{a.anilha}</Td>
                    <Td>{a.nome}</Td>
                    <Td>{a.linhagem}</Td>
                    <Td>{a.sexo}</Td>
                    <Td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          a.statusDescricao === "Ativa"
                            ? "bg-emerald-200 text-emerald-800"
                            : "bg-stone-300 text-stone-800"
                        }`}
                      >
                        {a.statusDescricao ?? "—"}
                      </span>
                    </Td>
                  </tr>
                ))}

              {!carregandoAves && avesFiltradas.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-stone-500">
                    Nenhuma ave encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableWrapper>

        <Center>
          <ExportBtn onClick={exportAvesPDF}>EXPORTAR PDF</ExportBtn>
        </Center>
      </Card>

      {/* ========= 2) HISTÓRICO DE CRUZAMENTOS ========= */}
      <Card>
        <SectionHeader title="HISTÓRICO DE CRUZAMENTOS">
          <SearchBox
            value={buscaCruz}
            onChange={setBuscaCruz}
            placeholder="Buscar por pai, mãe, data ou observação..."
          />
        </SectionHeader>

        <TableWrapper>
          <table className="w-full text-left">
            <thead className="bg-amber-200/70">
              <tr className="text-stone-900">
                <Th>MACHO (PAI)</Th>
                <Th>FÊMEA (MÃE)</Th>
                <Th>DATA</Th>
                <Th>OBSERVAÇÃO</Th>
              </tr>
            </thead>
            <tbody>
              {carregandoCruz && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-stone-500">
                    Carregando cruzamentos...
                  </td>
                </tr>
              )}

              {!carregandoCruz &&
                cruzFiltrados.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-amber-100 last:border-0"
                  >
                    <Td>{c.macho}</Td>
                    <Td>{c.femea}</Td>
                    <Td>{formatBR(c.data)}</Td>
                    <Td className="max-w-[540px] truncate">
                      {c.observacao}
                    </Td>
                  </tr>
                ))}

              {!carregandoCruz && cruzFiltrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-stone-500">
                    Nenhum cruzamento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableWrapper>

        <Center>
          <ExportBtn onClick={exportCruzPDF}>EXPORTAR PDF</ExportBtn>
        </Center>
      </Card>

      {/* ========= 3) ÁRVORE GENEALÓGICA ========= */}
      <Card>
        <h3 className="text-xl font-extrabold text-stone-900 mb-2 tracking-wide">
          ÁRVORE GENEALÓGICA
        </h3>

        <form
          className="grid grid-cols-1 md:grid-cols-[1fr,140px] gap-3 items-end"
          onSubmit={onBuscarArvore}
        >
          <div>
            <label className="font-extrabold text-stone-800">
              NOME / ANILHA / ID DA AVE
            </label>
          <SearchBox
            value={buscaArvore}
            onChange={setBuscaArvore}
            placeholder="Ex.: Turmalina, GSB001 ou 3"
          />
          </div>

          <button className="h-[44px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-wide">
            BUSCAR
          </button>
        </form>

        <div className="mt-4 rounded-2xl bg-amber-200/60 border border-amber-200 p-6 overflow-auto">
          <GenealogiaVis tree={arvore} selecionada={selecionada} />
        </div>

        <Center>
          <ExportBtn onClick={exportArvorePDF}>EXPORTAR PDF</ExportBtn>
        </Center>
      </Card>
    </div>
  );
}

/** ======== COMPONENTES DE UI REUTILIZÁVEIS ======== */

function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="
      rounded-[28px] border-2 border-amber-300 bg-[rgb(248,241,227)]
      shadow-[0_15px_40px_rgba(0,0,0,0.45)]
      p-6
    "
    >
      {children}
    </div>
  );
}

function SectionHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between flex-wrap mb-2 gap-4">
      <h3
        className="
        text-xl font-extrabold text-stone-900 tracking-wide uppercase
        drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]
      "
      >
        {title}
      </h3>

      {children}
    </div>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div
      className="
      flex items-center gap-2 rounded-2xl border border-amber-300
      bg-white/80 px-3 py-2 min-w-[260px] shadow-inner
    "
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        className="w-full bg-transparent outline-none font-medium"
      />
    </div>
  );
}

function ExportBtn({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-2 rounded-2xl bg-emerald-600 text-white 
        font-extrabold tracking-wide shadow-[0_4px_0_rgba(0,0,0,0.45)]
        hover:bg-emerald-700 active:translate-y-[1px]
      "
    >
      {children}
    </button>
  );
}

function TableWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="
      mt-3 overflow-auto rounded-2xl border border-amber-300
      bg-white/60 shadow-inner
    "
    >
      {children}
    </div>
  );
}

const Center = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-center mt-4">{children}</div>
);

function Th({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-sm font-extrabold tracking-wide ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 align-middle font-medium ${className}`}>
      {children}
    </td>
  );
}

function GenealogiaVis({
  tree,
  selecionada,
}: {
  tree: string[][];
  selecionada: string;
}) {
  return (
    <div className="w-full min-w-[720px] mx-auto textcenter">
      {selecionada && (
        <div className="mb-3 text-stone-800 font-semibold">
          Selecionada: <b>{selecionada}</b>
        </div>
      )}

      {tree.length === 0 ? (
        <div className="text-stone-600 text-sm">
          Nenhuma árvore para exibir. Busque pelo nome/anilha/id de uma ave
          cadastrada.
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {tree.map((nivel, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-6 flex-wrap"
            >
              {nivel.map((label, i) => (
                <div
                  key={i}
                  className="
                    w-40 h-12 rounded-xl bg-white shadow border border-amber-300
                    flex items-center justify-center px-3
                  "
                >
                  <span className="text-sm font-semibold text-stone-800 truncate">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** ======== HELPERS GERAIS ======== */

function normalize(t: string) {
  return (t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatBR(iso: string) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** ======== MAPEAMENTO DE CRUZAMENTO DTO -> ROW ======== */

function mapToCruzamentoRow(dto: CruzamentoDto): CruzamentoRow {
  const aves = dto.cruzamentoAves || [];

  const machoItem =
    aves.find((a) => a.papel.toLowerCase().includes("pai")) ||
    aves.find((a) => a.papel.toLowerCase().includes("macho"));

  const femeaItem =
    aves.find((a) =>
      a.papel.toLowerCase().includes("mae") ||
      a.papel.toLowerCase().includes("mãe")
    ) ||
    aves.find((a) =>
      a.papel.toLowerCase().includes("femea") ||
      a.papel.toLowerCase().includes("fêmea")
    );

  const macho =
    machoItem?.ave?.nome || (machoItem ? `Ave #${machoItem.aveId}` : "—");
  const femea =
    femeaItem?.ave?.nome || (femeaItem ? `Ave #${femeaItem.aveId}` : "—");

  const data = dto.data?.split("T")[0] ?? "";

  return {
    id: String(dto.id),
    macho,
    femea,
    data,
    observacao: dto.observacoes ?? "",
  };
}

/** ======== ÁRVORE A PARTIR DAS AVES + CRUZAMENTOS ======== */

function buildTreeFromAve(
  base: AveGenealogia,
  todas: AveGenealogia[],
  cruzamentosOrig: CruzamentoDto[]
): string[][] {
  const findAve = (id?: number | null) =>
    id == null ? null : todas.find((a) => a.id === id) || null;

  // 1) Tenta pegar pai/mãe direto dos campos paiId/maeId, se existirem
  const basePaiId = (base as any).paiId as number | null | undefined;
  const baseMaeId = (base as any).maeId as number | null | undefined;

  let pai = findAve(basePaiId ?? undefined);
  let mae = findAve(baseMaeId ?? undefined);

  // 2) Se ainda não tiver pai/mãe, tenta descobrir pelos cruzamentos
  if (!pai || !mae) {
    const cruzFilho = cruzamentosOrig.find((c) =>
      (c.cruzamentoAves || []).some(
        (a) =>
          a.aveId === base.id &&
          a.papel.toLowerCase().includes("filho")
      )
    );

    if (cruzFilho) {
      const avesC = cruzFilho.cruzamentoAves || [];

      if (!pai) {
        const paiItem =
          avesC.find((a) => a.papel.toLowerCase().includes("pai")) ||
          avesC.find((a) => a.papel.toLowerCase().includes("macho"));
        if (paiItem) pai = findAve(paiItem.aveId);
      }

      if (!mae) {
        const maeItem =
          avesC.find((a) =>
            a.papel.toLowerCase().includes("mae") ||
            a.papel.toLowerCase().includes("mãe")
          ) ||
          avesC.find((a) =>
            a.papel.toLowerCase().includes("femea") ||
            a.papel.toLowerCase().includes("fêmea")
          );
        if (maeItem) mae = findAve(maeItem.aveId);
      }
    }
  }

  const niveis: string[][] = [];
  const avos: string[] = [];

  const addAvosFromParent = (parent: AveGenealogia | null) => {
    if (!parent) return;
    const pPaiId = (parent as any).paiId as number | null | undefined;
    const pMaeId = (parent as any).maeId as number | null | undefined;
    const avoP = findAve(pPaiId ?? undefined);
    const avoM = findAve(pMaeId ?? undefined);
    if (avoP) avos.push(labelAve(avoP));
    if (avoM) avos.push(labelAve(avoM));
  };

  addAvosFromParent(pai);
  addAvosFromParent(mae);
  if (avos.length > 0) niveis.push(avos);

  const pais: string[] = [];
  if (pai) pais.push(labelAve(pai));
  if (mae) pais.push(labelAve(mae));
  if (pais.length > 0) niveis.push(pais);

  // Sempre mostra pelo menos o próprio animal
  niveis.push([labelAve(base)]);

  return niveis;
}

function labelAve(a: AveGenealogia) {
  return `${a.id} - ${a.anilha} - ${a.nome}`;
}
