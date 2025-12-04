import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { AveApi, type AveDto, type CreateAveRequest } from "./api/avesApi";


type Sexo = "Macho" | "Femea";

type FormAve = {
  anilha: string;
  nome: string;
  linhagem: string;
  pai: string;
  mae: string;
  crista: string;
  plumagem: string;
  peso?: number;
  nascimento: string;
  sexo: Sexo;
  ativo: boolean;
};


export default function CadastroAve() {
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState<AveDto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [form, setForm] = useState<FormAve>({
    anilha: gerarAnilha(),
    nome: "",
    linhagem: "",
    pai: "",
    mae: "",
    crista: "",
    plumagem: "",
    peso: undefined,
    nascimento: "",
    sexo: "Femea",
    ativo: true,
  });


  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const aves = await AveApi.listar();
        setLista(aves);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar aves da API.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);


  const filtrados = useMemo(() => {
    const q = normalizar(busca);
    if (!q) return lista;
    return lista.filter((a) =>
      [a.anilha, a.nome, a.linhagem]
        .filter(Boolean)
        .some((v) => normalizar(String(v)).includes(q))
    );
  }, [busca, lista]);


  function gerarAnilha() {
    return `GSB${String(Math.floor(1 + Math.random() * 999)).padStart(3, "0")}`;
  }

  function normalizar(t: string) {
    return (t || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }


  function onFieldChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const el = e.currentTarget;
    const name = el.name as keyof FormAve;

    if (el instanceof HTMLInputElement && el.type === "checkbox") {
      setForm((old) => ({ ...old, [name]: el.checked }));
      return;
    }

    if (name === "peso") {
      const v = (el as HTMLInputElement).value;
      const num = v === "" ? undefined : Number(v);
      setForm((old) => ({
        ...old,
        peso: Number.isFinite(num as number) ? (num as number) : undefined,
      }));
      return;
    }

    if (name === "sexo") {
      setForm((old) => ({ ...old, sexo: (el as HTMLSelectElement).value as Sexo }));
      return;
    }

    setForm((old) => ({ ...old, [name]: el.value }));
  }

  async function salvarNovaAve(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.nome.trim() ||
      !form.linhagem.trim() ||
      !form.crista ||
      !form.plumagem ||
      !form.nascimento
    ) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    const payload: CreateAveRequest = {
      anilha: form.anilha,
      nome: form.nome.trim(),
      linhagem: form.linhagem.trim(),
      sexo: form.sexo, 
      dataNascimento: form.nascimento,
      peso: form.peso ?? null,
      fotoPath: "", 
    };

    try {
      setSalvando(true);
      const criada = await AveApi.criar(payload);

      setLista((prev) => [criada, ...prev]);

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
        sexo: "Femea",
        ativo: true,
      });
    } catch (err: any) {
      console.error(err);
      alert("Erro ao salvar ave na API.");
    } finally {
      setSalvando(false);
    }
  }

  async function remover(id: number) {
    if (!window.confirm("Remover esta ave?")) return;
    try {
      await AveApi.excluir(id);
      setLista((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir ave.");
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px,1fr] gap-6">
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <h2 className="text-xl font-extrabold text-amber-800 mb-4">
          CADASTRAR NOVA AVE
        </h2>

        <form onSubmit={salvarNovaAve} className="space-y-3">
          <Campo label="NOME / ID*">
            <input
              name="nome"
              value={form.nome}
              onChange={onFieldChange}
              placeholder="Ex. Galo Turmalina"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </Campo>

          <Campo label="LINHAGEM*">
            <input
              name="linhagem"
              value={form.linhagem}
              onChange={onFieldChange}
              placeholder="Ex. Galo Esmeralda"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="PAI">
              <input
                name="pai"
                value={form.pai}
                onChange={onFieldChange}
                placeholder="código/identificador"
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
              />
            </Campo>
            <Campo label="MÃE">
              <input
                name="mae"
                value={form.mae}
                onChange={onFieldChange}
                placeholder="código/identificador"
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
              />
            </Campo>
          </div>

          <Campo label="CRISTA*">
            <select
              name="crista"
              value={form.crista}
              onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            >
              <option value="">Selecione</option>
              <option value="Simple">Simple</option>
              <option value="Ervilha">Ervilha</option>
              <option value="Rosa">Rosa</option>
            </select>
          </Campo>

          <Campo label="PLUMAGEM*">
            <select
              name="plumagem"
              value={form.plumagem}
              onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            >
              <option value="">Selecione</option>
              <option value="Carijó">Carijó</option>
              <option value="Preta">Preta</option>
              <option value="Branca">Branca</option>
            </select>
          </Campo>

          <Campo label="PESO (g)">
            <input
              name="peso"
              type="number"
              value={form.peso ?? ""}
              onChange={onFieldChange}
              placeholder="ex: 2350"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </Campo>

          <Campo label="DATA DE NASCIMENTO*">
            <input
              name="nascimento"
              type="date"
              value={form.nascimento}
              onChange={onFieldChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="SEXO">
              <select
                name="sexo"
                value={form.sexo}
                onChange={onFieldChange}
                className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
              >
                <option value="Macho">Macho</option>
                <option value="Femea">Fêmea</option>
              </select>
            </Campo>

            <div className="flex items-end gap-2">
              <input
                id="ativo"
                name="ativo"
                type="checkbox"
                checked={form.ativo}
                onChange={onFieldChange}
                className="size-5 accent-amber-600"
              />
              <label htmlFor="ativo" className="font-semibold">
                Ativo reprodutivo
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-70 text-white font-semibold px-4 py-3 transition-colors shadow-sm"
          >
            {salvando ? "SALVANDO..." : "SALVAR NOVA AVE"}
          </button>
        </form>
      </div>

      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-extrabold text-amber-800">
            TABELA DE AVES
          </h2>

          <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/80 px-3 py-2 min-w-[260px]">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Ex. galo doido"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-auto rounded-2xl border border-amber-200 bg-white/60">
          {carregando ? (
            <div className="py-8 text-center text-stone-500">
              Carregando aves...
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-amber-100/80">
                <tr className="text-stone-800">
                  <Th>ANILHA</Th>
                  <Th>NOME</Th>
                  <Th>LINHAGEM</Th>
                  <Th>SEXO</Th>
                  <Th>STATUS</Th>
                  <Th className="text-right pr-4">AÇÕES</Th>
                </tr>
              </thead>

              <tbody>
                {filtrados.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b last:border-0 border-amber-100"
                  >
                    <Td>{a.anilha}</Td>
                    <Td>{a.nome}</Td>
                    <Td>{a.linhagem}</Td>
                    <Td>{a.sexo}</Td>
                    <Td>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          a.statusDescricao === "Ativa"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {a.statusDescricao ?? "—"}
                      </span>
                    </Td>
                    <Td className="pr-2 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button className="px-3 py-2 rounded-xl border border-amber-200 bg-white/80">
                          Ver
                        </button>
                        <button className="px-3 py-2 rounded-xl border border-amber-200 bg-white/80">
                          Editar
                        </button>
                        <button
                          onClick={() => remover(a.id)}
                          className="px-3 py-2 rounded-xl border border-amber-200 bg-white/80"
                        >
                          Excluir
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}

                {filtrados.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-stone-500"
                    >
                      Nenhuma ave encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}


function Th({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th className={`px-4 py-3 text-sm font-bold ${className}`}>{children}</th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

function Campo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );
}
