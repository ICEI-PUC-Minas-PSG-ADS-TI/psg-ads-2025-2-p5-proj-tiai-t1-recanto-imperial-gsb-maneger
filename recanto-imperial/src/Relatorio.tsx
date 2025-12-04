import { useMemo, useState, type ReactNode, type FormEvent } from "react";

/* ---------------- TIPOS ---------------- */

type Sexo = "Macho" | "Fêmea" | "Indefinido";

type Ave = {
  anilha: string;
  nome: string;
  linhagem: string;
  sexo: Sexo;
  ativo: boolean;
};

type Cruzamento = {
  id: string;
  macho: string;
  femea: string;
  data: string;
  observacao: string;
};

/* ---------------- COMPONENTE PRINCIPAL ---------------- */

export default function RelatorioExportacao() {
  const [aves] = useState<Ave[]>([
    { anilha: "GSB001", nome: "Turmalina", linhagem: "Galo Esmeralda", sexo: "Fêmea", ativo: true },
    { anilha: "GSB002", nome: "Ônix", linhagem: "Galo Esmeralda", sexo: "Macho", ativo: true },
    { anilha: "GSB003", nome: "Jade", linhagem: "Safira", sexo: "Fêmea", ativo: false },
  ]);

  const [cruzamentos] = useState<Cruzamento[]>([
    { id: genId(), macho: "Aruanã", femea: "Esmeralda", data: "2025-10-12", observacao: "Baia número 2" },
    { id: genId(), macho: "Aruanã", femea: "Esmeralda", data: "2025-10-12", observacao: "Cobertura assistida" },
    { id: genId(), macho: "Fênix", femea: "Turmalina", data: "2025-09-01", observacao: "Cobertura natural" },
  ]);

  const [buscaAves, setBuscaAves] = useState("");
  const [buscaCruz, setBuscaCruz] = useState("");
  const [buscaArvore, setBuscaArvore] = useState("");
  const [selecionada, setSelecionada] = useState("");


  const avesFiltradas = useMemo(() => {
    const q = normalize(buscaAves);
    if (!q) return aves;
    return aves.filter(a =>
      [a.anilha, a.nome, a.linhagem, a.sexo].some(v => normalize(String(v)).includes(q))
    );
  }, [aves, buscaAves]);

  const cruzFiltrados = useMemo(() => {
    const q = normalize(buscaCruz);
    if (!q) return cruzamentos;
    return cruzamentos.filter(c =>
      [c.macho, c.femea, c.data, c.observacao].some(v => normalize(v).includes(q))
    );
  }, [cruzamentos, buscaCruz]);

  const arvore = useMemo(() => {
    const base =
      aves.find(a => normalize(a.nome).includes(normalize(buscaArvore))) ||
      aves.find(a => normalize(a.anilha).includes(normalize(buscaArvore)));

    setSelecionada(base ? `${base.anilha} - ${base.nome}` : "");

    return buildDummyTree(base ? base.nome : "—");
  }, [aves, buscaArvore]);


  function exportCSV(nome: string, headers: string[], rows: string[][]) {
    const csv = [headers.join(","), ...rows.map(r => r.map(safeCSV).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${nome}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportAves() {
    exportCSV("tabela_aves",
      ["Anilha", "Nome", "Linhagem", "Sexo", "Status"],
      avesFiltradas.map(a => [a.anilha, a.nome, a.linhagem, a.sexo, a.ativo ? "Ativo" : "Inativo"])
    );
  }

  function exportCruz() {
    exportCSV("historico_cruzamentos",
      ["Macho", "Fêmea", "Data", "Observação"],
      cruzFiltrados.map(c => [c.macho, c.femea, formatBR(c.data), c.observacao])
    );
  }

  function exportArvore() {
    exportCSV("arvore_genealogica",
      ["Nível", "Rótulo"],
      arvore.flatMap((nivel, idx) => nivel.map(lbl => [String(idx + 1), lbl]))
    );
  }


  return (
    <div className="space-y-12">

      <Card>
        <SectionHeader title="TABELA DE AVES">
          <SearchBox value={buscaAves} onChange={setBuscaAves} />
        </SectionHeader>

        <TableWrapper>
          <table className="w-full text-left">
            <thead className="bg-amber-200/70">
              <tr className="text-stone-900">
                <Th>ANILHA</Th><Th>NOME</Th><Th>LINHAGEM</Th><Th>SEXO</Th><Th>STATUS</Th>
                <Th className="text-right pr-4">AÇÕES</Th>
              </tr>
            </thead>

            <tbody>
              {avesFiltradas.map(a => (
                <tr key={a.anilha} className="border-b border-amber-100 last:border-0">
                  <Td>{a.anilha}</Td>
                  <Td>{a.nome}</Td>
                  <Td>{a.linhagem}</Td>
                  <Td>{a.sexo}</Td>
                  <Td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      a.ativo ? "bg-emerald-200 text-emerald-800" : "bg-stone-300 text-stone-800"
                    }`}>
                      {a.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </Td>

                  <Td className="text-right pr-3">
                    <div className="inline-flex gap-2">
                      <GhostBtn>VER</GhostBtn>
                      <GhostBtn>EDITAR</GhostBtn>
                      <GhostBtn>EXCLUIR</GhostBtn>
                    </div>
                  </Td>
                </tr>
              ))}

              {avesFiltradas.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-stone-500">Nenhuma ave encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </TableWrapper>

        <Center><ExportBtn onClick={exportAves}>EXPORTAR</ExportBtn></Center>
      </Card>

      <Card>
        <SectionHeader title="HISTÓRICO DE CRUZAMENTOS">
          <SearchBox value={buscaCruz} onChange={setBuscaCruz} />
        </SectionHeader>

        <TableWrapper>
          <table className="w-full text-left">
            <thead className="bg-amber-200/70">
              <tr className="text-stone-900">
                <Th>MACHO</Th><Th>FÊMEA</Th><Th>DATA</Th><Th>OBSERVAÇÃO</Th>
              </tr>
            </thead>

            <tbody>
              {cruzFiltrados.map(c => (
                <tr key={c.id} className="border-b border-amber-100 last:border-0">
                  <Td>{c.macho}</Td>
                  <Td>{c.femea}</Td>
                  <Td>{formatBR(c.data)}</Td>
                  <Td className="max-w-[540px] truncate">{c.observacao}</Td>
                </tr>
              ))}

              {cruzFiltrados.length === 0 && (
                <tr><td colSpan={4} className="py-10 text-center text-stone-500">Nenhum cruzamento encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </TableWrapper>

        <Center><ExportBtn onClick={exportCruz}>EXPORTAR</ExportBtn></Center>
      </Card>

      <Card>
        <h3 className="text-xl font-extrabold text-stone-900 mb-2 tracking-wide">ÁRVORE GENEALÓGICA</h3>

        <form className="grid grid-cols-1 md:grid-cols-[1fr,140px] gap-3 items-end" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-extrabold text-stone-800">NOME DA AVE</label>
            <SearchBox value={buscaArvore} onChange={setBuscaArvore} />
          </div>

          <button className="h-[44px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-wide">
            BUSCAR
          </button>
        </form>

        <div className="mt-4 rounded-2xl bg-amber-200/60 border border-amber-200 p-6 overflow-auto">
          <GenealogiaVis tree={arvore} selecionada={selecionada} />
        </div>

        <Center><ExportBtn onClick={exportArvore}>EXPORTAR</ExportBtn></Center>
      </Card>

    </div>
  );
}


function Card({ children }: { children: ReactNode }) {
  return (
    <div className="
      rounded-[28px] border-2 border-amber-300 bg-[rgb(248,241,227)]
      shadow-[0_15px_40px_rgba(0,0,0,0.45)]
      p-6
    ">
      {children}
    </div>
  );
}

function SectionHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between flex-wrap mb-2 gap-4">
      <h3 className="
        text-xl font-extrabold text-stone-900 tracking-wide uppercase
        drop-shadow-[0_2px_0_rgba(0,0,0,0.4)]
      ">
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
    <div className="
      flex items-center gap-2 rounded-2xl border border-amber-300
      bg-white/80 px-3 py-2 min-w-[260px] shadow-inner
    ">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        className="w-full bg-transparent outline-none font-medium"
      />
    </div>
  );
}

function ExportBtn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
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

function GhostBtn({ children }: { children: ReactNode }) {
  return (
    <button className="
      px-3 py-1 rounded-xl border border-amber-300 bg-white/70
      hover:bg-amber-100 text-sm font-semibold
    ">
      {children}
    </button>
  );
}

function TableWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="
      mt-3 overflow-auto rounded-2xl border border-amber-300
      bg-white/60 shadow-inner
    ">
      {children}
    </div>
  );
}

const Center = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-center mt-4">{children}</div>
);

function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 text-sm font-extrabold tracking-wide ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle font-medium ${className}`}>{children}</td>;
}


function GenealogiaVis({ tree, selecionada }: { tree: string[][]; selecionada: string }) {
  return (
    <div className="w-full min-w-[720px] mx-auto text-center">
      {selecionada && (
        <div className="mb-3 text-stone-800 font-semibold">
          Selecionada: <b>{selecionada}</b>
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        {tree.map((nivel, idx) => (
          <div key={idx} className="flex items-center justify-center gap-6">
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
    </div>
  );
}

function genId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function normalize(t: string) {
  return (t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatBR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function safeCSV(s: string) {
  return `"${String(s).replace(/"/g, '""')}"`;
}

function buildDummyTree(root: string): string[][] {
  return [
    ["Avo (M)", "Avo (F)", "Avo2 (M)", "Avo2 (F)"],
    ["Pai", "Mãe"],
    [root],
  ];
}
