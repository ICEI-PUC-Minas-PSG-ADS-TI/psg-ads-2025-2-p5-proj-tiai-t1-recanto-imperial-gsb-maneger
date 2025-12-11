import { useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";

type Cruzamento = {
  id: string;
  macho: string;
  femea: string;
  data: string;         // yyyy-mm-dd
  observacao: string;
};

type ThProps = { children: ReactNode; className?: string };
type TdProps = { children: ReactNode; className?: string };

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
    <div className="grid grid-cols-1 xl:grid-cols-[440px,1fr,360px] gap-6">
      {/* Novo cruzamento */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <h2 className="text-xl font-extrabold text-amber-800 mb-4">NOVO CRUZAMENTO</h2>

        <form onSubmit={salvar} className="space-y-3">
          <Campo label="MACHO *">
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white/80 px-3 py-2">
              <input name="macho" value={form.macho} onChange={onChange} placeholder="Ex. galo doido" className="w-full bg-transparent outline-none" />
            </div>
          </Campo>

          <Campo label="FÊMEA *">
            <input name="femea" value={form.femea} onChange={onChange} placeholder="Ex. galinha maluca"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" />
          </Campo>

          <Campo label="DATA DO CRUZAMENTO *">
            <input type="date" name="data" value={form.data} onChange={onChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" />
          </Campo>

          <Campo label="OBSERVAÇÃO *">
            <textarea name="observacao" value={form.observacao} onChange={onChange} rows={5}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none resize-y"
              placeholder="Ex.: Baia 2, cobertura assistida…" />
          </Campo>

          <button type="submit"
            className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 transition-colors shadow-sm">
            SALVAR CRUZAMENTO
          </button>
        </form>
      </div>

      {/* Histórico */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <h2 className="text-xl font-extrabold text-amber-800 mb-4">HISTÓRICO DE CRUZAMENTOS</h2>

        <div className="overflow-auto rounded-2xl border border-amber-200 bg-white/60">
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
                <tr><td colSpan={4} className="py-8 text-center text-stone-500">Nenhum cruzamento encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Busca lateral */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <div className="font-extrabold text-amber-800 text-xl mb-4">BUSCA</div>
        <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/80 px-3 py-2">
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Ex. galo doido"
            className="w-full bg-transparent outline-none" />
        </div>
        <p className="text-xs text-stone-500 mt-3">
          Dica: pesquise por macho, fêmea, data ou observação.
        </p>
      </div>
    </div>
  );
}

/* helpers e subcomponentes */
function gerarId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}
function formatarDataBR(iso: string) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
function Th({ children, className = "" }: ThProps) { return <th className={`px-4 py-3 text-sm font-extrabold tracking-wide ${className}`}>{children}</th>; }
function Td({ children, className = "" }: TdProps) { return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>; }
function Campo({ label, children }: { label: string; children: ReactNode }) {
  return (<div><label className="font-extrabold text-stone-800">{label}</label>{children}</div>);
}
