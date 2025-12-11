import React, { useMemo, useState } from "react";
import { Eye, Pencil, Trash2, PlusCircle, Search } from "lucide-react";

export type Sexo = "Indefinido" | "Macho" | "Fêmea";

export interface Ave {
  anilha: string;
  nome: string;
  linhagem: string;
  pai?: string;
  mae?: string;
  crista: string;
  plumagem: string;
  peso?: number;
  nascimento: string;
  sexo: Sexo;
  ativo: boolean;
}

type IconBtnProps = { title: string; onClick?: () => void; children: React.ReactNode };
type ThProps = { children: React.ReactNode; className?: string };
type TdProps = { children: React.ReactNode; className?: string };

export default function CadastroAve(): JSX.Element {
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState<Ave[]>([
    {
      anilha: "GSB001",
      nome: "Turmalina",
      linhagem: "Galo Esmeralda",
      sexo: "Fêmea",
      ativo: true,
      crista: "Rosa",
      plumagem: "Carijó",
      nascimento: "2025-01-10",
      peso: 2150,
    },
  ]);

  const [form, setForm] = useState<Omit<Ave, "anilha"> & { anilha?: string }>({
    anilha: gerarAnilha(),
    nome: "",
    linhagem: "",
    pai: "",
    mae: "",
    crista: "",
    plumagem: "",
    peso: undefined,
    nascimento: "",
    sexo: "Indefinido",
    ativo: true,
  });

  const filtrados = useMemo(() => {
    if (!busca.trim()) return lista;
    const q = normalizar(busca);
    return lista.filter(
      (a) =>
        normalizar(a.anilha).includes(q) ||
        normalizar(a.nome).includes(q) ||
        normalizar(a.linhagem).includes(q)
    );
  }, [busca, lista]);

  function gerarAnilha() {
    const n = Math.floor(1 + Math.random() * 999).toString().padStart(3, "0");
    return `GSB${n}`;
  }

  function normalizar(txt: string) {
    return txt.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }

  function onFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target as HTMLInputElement & HTMLSelectElement;
    setForm((old) => {
      if (type === "checkbox") return { ...old, [name]: checked };
      if (name === "peso")
        return { ...old, peso: value === "" ? undefined : Number(value) };
      if (name === "sexo") return { ...old, sexo: value as Sexo };
      return { ...old, [name]: value };
    });
  }

  function salvarNovaAve(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.nome.trim() || !form.linhagem.trim() || !form.crista || !form.plumagem || !form.nascimento) {
      alert("Preencha os campos obrigatórios.");
      return;
    }
    const nova: Ave = { ...form, anilha: form.anilha || gerarAnilha() } as Ave;
    setLista((p) => [nova, ...p]);
    setForm({
      anilha: gerarAnilha(),
      nome: "",
      linhagem: "",
      pai: "",
      mae: "",
      crista: "",
      plumagem: "",
      peso: undefined,
      nascimento: "",
      sexo: "Indefinido",
      ativo: true,
    });
  }

  function remover(anilha: string) {
    if (confirm(`Remover ${anilha}?`)) setLista((p) => p.filter((a) => a.anilha !== anilha));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px,1fr] gap-6">
      {/* Formulário */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <h2 className="text-xl font-extrabold text-amber-800 mb-4">CADASTRAR NOVA AVE</h2>
        <form onSubmit={salvarNovaAve} className="space-y-3">
          <Campo label="NOME / ID*">
            <input name="nome" value={form.nome} onChange={onFieldChange} placeholder="Ex. Galo Turmalina"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" />
          </Campo>

          <Campo label="LINHAGEM*">
            <input name="linhagem" value={form.linhagem} onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="PAI"><input name="pai" value={form.pai} onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" /></Campo>
            <Campo label="MÃE"><input name="mae" value={form.mae} onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" /></Campo>
          </div>

          <Campo label="CRISTA*">
            <select name="crista" value={form.crista} onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none">
              <option value="">Selecione</option>
              <option value="Simple">Simple</option>
              <option value="Ervilha">Ervilha</option>
              <option value="Rosa">Rosa</option>
            </select>
          </Campo>

          <Campo label="PLUMAGEM*">
            <select name="plumagem" value={form.plumagem} onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none">
              <option value="">Selecione</option>
              <option value="Carijó">Carijó</option>
              <option value="Preta">Preta</option>
              <option value="Branca">Branca</option>
            </select>
          </Campo>

          <Campo label="PESO (g)">
            <input name="peso" value={form.peso ?? ""} onChange={onFieldChange} type="number"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" />
          </Campo>

          <Campo label="DATA DE NASCIMENTO*">
            <input name="nascimento" value={form.nascimento} onChange={onFieldChange} type="date"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none" />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="SEXO">
              <select name="sexo" value={form.sexo} onChange={onFieldChange}
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none">
                <option value="Indefinido">Indefinido</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </Campo>
            <div className="flex items-end gap-2">
              <input id="ativo" name="ativo" type="checkbox" checked={form.ativo} onChange={onFieldChange}
                className="size-5 accent-amber-600" />
              <label htmlFor="ativo" className="font-semibold">Ativo reprodutivo</label>
            </div>
          </div>

          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-3 transition-colors shadow-sm">
            <PlusCircle className="size-5" /> SALVAR NOVA AVE
          </button>
        </form>
      </div>

      {/* Tabela */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-extrabold text-amber-800">TABELA DE AVES</h2>
          <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/80 px-3 py-2 min-w-[260px]">
            <Search className="size-4 opacity-70" />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar..." className="w-full bg-transparent outline-none" />
          </div>
        </div>

        <div className="mt-4 overflow-auto rounded-2xl border border-amber-200 bg-white/60">
          <table className="w-full text-left">
            <thead className="bg-amber-100/80">
              <tr className="text-stone-800">
                <Th>ANILHA</Th><Th>NOME</Th><Th>LINHAGEM</Th><Th>SEXO</Th><Th>STATUS</Th><Th className="text-right pr-4">AÇÕES</Th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((a) => (
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
                  <Td className="pr-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <IconBtn title="Ver"><Eye className="size-4" /></IconBtn>
                      <IconBtn title="Editar"><Pencil className="size-4" /></IconBtn>
                      <IconBtn title="Excluir" onClick={() => remover(a.anilha)}><Trash2 className="size-4" /></IconBtn>
                    </div>
                  </Td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-stone-500">Nenhuma ave encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children, className = "" }: ThProps) { return <th className={`px-4 py-3 text-sm font-bold ${className}`}>{children}</th>; }
function Td({ children, className = "" }: TdProps) { return <td className={`px-4 py-3 ${className}`}>{children}</td>; }
function IconBtn({ children, title, onClick }: IconBtnProps) {
  return <button onClick={onClick} title={title} className="inline-flex items-center justify-center rounded-xl border border-amber-200 bg-white/80 px-3 py-2 hover:bg-amber-50">{children}</button>;
}
function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="font-semibold">{label}</label>{children}</div>;
}
