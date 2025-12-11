import { useMemo, useState, type ReactNode, type FormEvent } from "react";

/** Tipos compartilhados */
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
  data: string;       // yyyy-mm-dd
  observacao: string;
};

/** --------- Componente principal --------- */
export default function RelatorioExportacao() {
  /** mock – substitua depois pelo seu backend */
  const [aves] = useState<Ave[]>([
    { anilha: "GSB001", nome: "Turmalina", linhagem: "Galo Esmeralda", sexo: "Fêmea", ativo: true },
    { anilha: "GSB002", nome: "Ônix",      linhagem: "Galo Esmeralda", sexo: "Macho",  ativo: true },
    { anilha: "GSB003", nome: "Jade",      linhagem: "Safira",         sexo: "Fêmea", ativo: false },
  ]);

  const [cruzamentos] = useState<Cruzamento[]>([
    { id: genId(), macho: "Aruanã", femea: "Esmeralda", data: "2025-10-12", observacao: "Baia de número 2 busca ativa" },
    { id: genId(), macho: "Aruanã", femea: "Esmeralda", data: "2025-10-12", observacao: "Cobertura assistida" },
    { id: genId(), macho: "Fênix",  femea: "Turmalina", data: "2025-09-01", observacao: "Cobertura natural" },
  ]);

  /** filtros */
  const [buscaAves, setBuscaAves] = useState("");
  const [buscaCruz, setBuscaCruz] = useState("");
  const [buscaArvore, setBuscaArvore] = useState("");
  const [selecionada, setSelecionada] = useState<string>(""); // anilha/nome da árvore

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

  /** árvore: procura por nome/anilha simples e monta uma árvore “dummy” */
  const arvore = useMemo(() => {
    const base =
      aves.find(a => normalize(a.nome).includes(normalize(buscaArvore))) ||
      aves.find(a => normalize(a.anilha).includes(normalize(buscaArvore)));
    setSelecionada(base ? `${base.anilha} - ${base.nome}` : "");
    // Estrutura 1-2-4-1 (somente o layout do protótipo)
    return buildDummyTree(base ? base.nome : "—");
  }, [aves, buscaArvore]);

  /** exportações */
  function exportCSV(nomeArquivo: string, headers: string[], rows: string[][]) {
    const csv = [headers.join(","), ...rows.map(r => r.map(safeCSV).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nomeArquivo}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportAves() {
    exportCSV(
      "tabela_aves",
      ["Anilha", "Nome", "Linhagem", "Sexo", "Status"],
      avesFiltradas.map(a => [a.anilha, a.nome, a.linhagem, a.sexo, a.ativo ? "Ativo" : "Inativo"])
    );
  }

  function exportCruz() {
    exportCSV(
      "historico_cruzamentos",
      ["Macho", "Fêmea", "Data", "Observação"],
      cruzFiltrados.map(c => [c.macho, c.femea, formatBR(c.data), c.observacao])
    );
  }

  function exportArvore() {
    exportCSV(
      "arvore_genealogica",
      ["Nível", "Rótulo"],
      arvore.flatMap((nivel, idx) => nivel.map(lbl => [String(idx + 1), lbl]))
    );
  }

  return (
    <div className="space-y-12">
      {/* ============== TABELA DE AVES ============== */}
      <Card>
        <SectionHeader title="TABELA DE AVES">
          <SearchBox value={buscaAves} onChange={setBuscaAves} placeholder="Ex. galo doido" />
        </SectionHeader>

        <div className="mt-3 overflow-auto rounded-2xl border border-amber-200 bg-white/60">
          <table className="w-full text-left">
            <thead className="bg-amber-100/80">
              <tr className="text-stone-800">
                <Th>ANILHA</Th><Th>NOME</Th><Th>LINHAGEM</Th><Th>SEXO</Th><Th>STATUS</Th>
                <Th className="text-right pr-4">AÇÕES</Th>
              </tr>
            </thead>
            <tbody>
              {avesFiltradas.map(a => (
                <tr key={a.anilha} className="border-b last:border-0 border-amber-100">
                  <Td>{a.anilha}</Td>
                  <Td>{a.nome}</Td>
                  <Td>{a.linhagem}</Td>
                  <Td>{a.sexo}</Td>
                  <Td>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${a.ativo ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-700"}`}>
                      {a.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </Td>
                  <Td className="text-right pr-3">
                    <div className="inline-flex gap-2">
                      <GhostBtn>ver</GhostBtn>
                      <GhostBtn>editar</GhostBtn>
                      <GhostBtn>excluir</GhostBtn>
                    </div>
                  </Td>
                </tr>
              ))}
              {avesFiltradas.length === 0 && (
                <tr><td colSpan={6} className="py-10 text-center text-stone-500">Nenhuma ave encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-5">
          <ExportBtn onClick={exportAves}>EXPORTAR</ExportBtn>
        </div>
      </Card>

      {/* ============== HISTÓRICO DE CRUZAMENTOS ============== */}
      <Card>
        <SectionHeader title="HISTÓRICO DE CRUZAMENTOS">
          <SearchBox value={buscaCruz} onChange={setBuscaCruz} placeholder="Ex. galo doido" />
        </SectionHeader>

        <div className="mt-3 overflow-auto rounded-2xl border border-amber-200 bg-white/60">
          <table className="w-full text-left">
            <thead className="bg-amber-100/80">
              <tr className="text-stone-800">
                <Th>MACHO</Th><Th>FÊMEA</Th><Th>DATA</Th><Th>OBSERVAÇÃO</Th>
              </tr>
            </thead>
            <tbody>
              {cruzFiltrados.map(c => (
                <tr key={c.id} className="border-b last:border-0 border-amber-100">
                  <Td>{c.macho}</Td>
                  <Td>{c.femea}</Td>
                  <Td>{formatBR(c.data)}</Td>
                  <Td className="max-w-[520px] truncate">{c.observacao}</Td>
                </tr>
              ))}
              {cruzFiltrados.length === 0 && (
                <tr><td colSpan={4} className="py-10 text-center text-stone-500">Nenhum cruzamento encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-5">
          <ExportBtn onClick={exportCruz}>EXPORTAR</ExportBtn>
        </div>
      </Card>

      {/* ============== ÁRVORE GENEALÓGICA ============== */}
      <Card>
        <h3 className="text-xl font-extrabold text-stone-800 mb-2">ARVORE GENEALÓGICA</h3>

        <form className="grid grid-cols-1 md:grid-cols-[1fr,140px] gap-3 items-end" onSubmit={(e: FormEvent) => e.preventDefault()}>
          <div>
            <label className="font-extrabold text-stone-800">NOME DA AVE</label>
            <SearchBox value={buscaArvore} onChange={setBuscaArvore} placeholder="Ex. galo doido" />
          </div>
          <button type="submit" className="h-[42px] md:h-[44px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-wide">
            BUSCAR
          </button>
        </form>

        <div className="mt-4 rounded-2xl bg-amber-200/60 border border-amber-200 p-6 overflow-auto">
          <GenealogiaVis tree={arvore} selecionada={selecionada} />
        </div>

        <div className="flex justify-center mt-5">
          <ExportBtn onClick={exportArvore}>EXPORTAR</ExportBtn>
        </div>
      </Card>
    </div>
  );
}

/* ========= Subcomponentes/UI ========= */

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[28px] border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
      {children}
    </div>
  );
}

function SectionHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
      <h3 className="text-xl font-extrabold text-stone-800">{title}</h3>
      {children}
    </div>
  );
}

function SearchBox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string; }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/80 px-3 py-2 min-w-[260px]">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar..."}
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}

function ExportBtn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button onClick={onClick} className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-wide px-6 py-2">
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="px-3 py-1 rounded-xl border border-amber-200 bg-white/70 hover:bg-amber-50 text-sm">
      {children}
    </button>
  );
}

function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <th className={`px-4 py-3 text-sm font-bold tracking-wide ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

/* ========= Genealogia (mock visual) ========= */

function GenealogiaVis({ tree, selecionada }: { tree: string[][]; selecionada: string }) {
  return (
    <div className="w-full min-w-[720px] mx-auto text-center">
      {selecionada && <div className="mb-3 text-stone-700">Selecionada: <b>{selecionada}</b></div>}
      <div className="flex flex-col items-center gap-6">
        {tree.map((nivel, idx) => (
          <div key={idx} className="flex items-center justify-center gap-6">
            {nivel.map((label, i) => (
              <div key={i} className="w-40 h-12 rounded-xl bg-white shadow border border-amber-200 flex items-center justify-center">
                <span className="text-sm font-semibold text-stone-700 truncate px-2">{label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========= utils ========= */

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
  // envolve com aspas e escapa aspas internas
  if (s == null) return '""';
  const v = String(s).replace(/"/g, '""');
  return `"${v}"`;
}

function buildDummyTree(root: string): string[][] {
  // apenas para layout semelhante ao protótipo
  return [
    ["Avo (M)", "Avo (F)", "Avo2 (M)", "Avo2 (F)"],   // 4
    ["Pai", "Mãe"],                                   // 2
    [root],                                           // 1
  ].reverse(); // exibe de cima pra baixo: 4 → 2 → 1 (ajuste conforme preferir)
}
