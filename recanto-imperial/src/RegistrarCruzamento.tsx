import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

type Cruzamento = {
  id: string;
  macho: string;
  femea: string;
  data: string;        
  observacao: string;
};

export default function RegistrarCruzamento() {
  const [busca, setBusca] = useState("");
  const [historico, setHistorico] = useState<Cruzamento[]>([
    { id: "1", macho: "Aruanã", femea: "Esmeralda", data: "2025-10-12", observacao: "Baia número 2, busca ativa." },
  ]);

  const [form, setForm] = useState<Omit<Cruzamento, "id">>({
    macho: "",
    femea: "",
    data: "",
    observacao: "",
  });

  const filtrados = useMemo(() => {
    const q = (busca || "").toLowerCase();
    if (!q) return historico;
    return historico.filter(c =>
      [c.macho, c.femea, c.data, c.observacao].some(v => (v || "").toLowerCase().includes(q))
    );
  }, [busca, historico]);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(o => ({ ...o, [name]: value }));
  }

  function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.macho.trim() || !form.femea.trim() || !form.data || !form.observacao.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    const novo: Cruzamento = { id: gerarId(), ...form };
    setHistorico(prev => [novo, ...prev]);
    setForm({ macho: "", femea: "", data: "", observacao: "" });
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[430px,1fr,350px] gap-8">

      {/* FORM NOVO CRUZAMENTO */}
      <div className="rounded-[32px] border-[3px] border-amber-300 bg-[rgb(250,240,220)]/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)] px-7 py-6">

        {/* Título igual ao cadastro */}
        <div className="mb-5 pb-3 border-b border-amber-300">
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-[0.20em] uppercase text-center drop-shadow-[0_3px_0_rgba(0,0,0,0.85)]">
            NOVO CRUZAMENTO
          </h2>
        </div>

        <form onSubmit={salvar} className="space-y-4">
          
          <Campo label="MACHO *">
            <input
              name="macho"
              value={form.macho}
              onChange={onChange}
              placeholder="Ex. galo aruanã"
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none shadow-inner
                         focus:ring-2 focus:ring-amber-500"
            />
          </Campo>

          <Campo label="FÊMEA *">
            <input
              name="femea"
              value={form.femea}
              onChange={onChange}
              placeholder="Ex. esmeralda"
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none shadow-inner
                         focus:ring-2 focus:ring-amber-500"
            />
          </Campo>

          <Campo label="DATA DO CRUZAMENTO *">
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={onChange}
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none shadow-inner
                         focus:ring-2 focus:ring-amber-500"
            />
          </Campo>

          <Campo label="OBSERVAÇÃO *">
            <textarea
              name="observacao"
              value={form.observacao}
              onChange={onChange}
              rows={4}
              placeholder="Ex.: Baia 2, cobertura assistida…"
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none shadow-inner resize-y
                         focus:ring-2 focus:ring-amber-500"
            />
          </Campo>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold 
                       tracking-[0.12em] uppercase px-4 py-3 transition-colors 
                       shadow-[0_6px_0_rgba(0,90,0,0.8)]">
            SALVAR CRUZAMENTO
          </button>

        </form>
      </div>

      {/* HISTÓRICO */}
      <div className="rounded-[32px] border-[3px] border-amber-300 bg-[rgb(250,240,220)]/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)] p-6">

        <h2 className="text-2xl font-extrabold text-amber-700 tracking-[0.20em] uppercase mb-6 text-center drop-shadow-[0_3px_0_rgba(0,0,0,0.85)]">
          HISTÓRICO
        </h2>

        <div className="overflow-auto rounded-2xl border border-amber-300 bg-white/60">
          <table className="w-full text-left">
            <thead className="bg-amber-100/80">
              <tr>
                <Th>MACHO</Th>
                <Th>FÊMEA</Th>
                <Th>DATA</Th>
                <Th>OBSERVAÇÃO</Th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(c => (
                <tr key={c.id} className="border-b last:border-0 border-amber-100">
                  <Td>{c.macho}</Td>
                  <Td>{c.femea}</Td>
                  <Td>{formatarDataBR(c.data)}</Td>
                  <Td className="max-w-[420px] truncate">{c.observacao}</Td>
                </tr>
              ))}

              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-stone-500">
                    Nenhum cruzamento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* BUSCA LATERAL */}
      <div className="rounded-[32px] border-[3px] border-amber-300 bg-[rgb(250,240,220)]/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)] p-6">

        <h3 className="text-2xl font-extrabold text-amber-700 tracking-[0.20em] uppercase mb-6 text-center drop-shadow-[0_3px_0_rgba(0,0,0,0.85)]">
          BUSCA
        </h3>

        <div className="flex items-center gap-2 rounded-2xl border border-amber-300 bg-white/80 px-3 py-2">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite para buscar…"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <p className="text-xs text-stone-600 mt-3 text-center">
          Pesquise por macho, fêmea, data ou observação.
        </p>

      </div>
    </div>
  );
}

/* ===== HELPERS ===== */
function gerarId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}
function formatarDataBR(iso: string) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/* ===== COMPONENTES ===== */
function Th({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-3 text-sm font-extrabold tracking-wide text-stone-800">
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
function Campo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="font-extrabold text-stone-900 text-xs tracking-[0.16em] uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}
