import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

type Sexo = "Indefinido" | "Macho" | "Fêmea";

interface Ave {
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
  const [lista, setLista] = useState<Ave[]>([
    {
      anilha: "GSB001",
      nome: "Turmalina",
      linhagem: "Galo Esmeralda",
      pai: "",
      mae: "",
      crista: "Rosa",
      plumagem: "Carijó",
      peso: 2150,
      nascimento: "2025-01-10",
      sexo: "Fêmea",
      ativo: true,
    },
  ]);

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
    sexo: "Indefinido",
    ativo: true,
  });

  const filtrados = useMemo(() => {
    const q = normalizar(busca);
    if (!q) return lista;
    return lista.filter((a) =>
      [a.anilha, a.nome, a.linhagem].some((v) =>
        normalizar(String(v)).includes(q)
      )
    );
  }, [busca, lista]);

  function gerarAnilha() {
    return `GSB${String(Math.floor(1 + Math.random() * 999)).padStart(
      3,
      "0"
    )}`;
  }

  function normalizar(t: string) {
    return (t || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function onFieldChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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
      setForm((old) => ({
        ...old,
        sexo: (el as HTMLSelectElement).value as Sexo,
      }));
      return;
    }

    setForm((old) => ({ ...old, [name]: el.value }));
  }

  function salvarNovaAve(e: FormEvent<HTMLFormElement>) {
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

    const nova: Ave = {
      anilha: form.anilha || gerarAnilha(),
      nome: form.nome.trim(),
      linhagem: form.linhagem.trim(),
      pai: form.pai.trim() ? form.pai.trim() : undefined,
      mae: form.mae.trim() ? form.mae.trim() : undefined,
      crista: form.crista,
      plumagem: form.plumagem,
      peso: form.peso,
      nascimento: form.nascimento,
      sexo: form.sexo,
      ativo: form.ativo,
    };

    setLista((prev) => [nova, ...prev]);

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
    if (window.confirm(`Remover ${anilha}?`)) {
      setLista((prev) => prev.filter((a) => a.anilha !== anilha));
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[430px,1fr] gap-8">
      <div className="rounded-[32px] border-[3px] border-amber-300 bg-[rgb(250,240,220)]/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)] px-7 py-6">
        <div className="mb-5 pb-3 border-b border-amber-300">
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-[0.20em] uppercase text-center drop-shadow-[0_3px_0_rgba(0,0,0,0.85)]">
            CADASTRAR NOVA AVE
          </h2>
        </div>

        <form onSubmit={salvarNovaAve} className="space-y-4">
          <Campo label="NOME / ID*">
            <input
              name="nome"
              value={form.nome}
              onChange={onFieldChange}
              placeholder="Ex. galo doido"
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <Campo label="LINHAGEM*">
            <input
              name="linhagem"
              value={form.linhagem}
              onChange={onFieldChange}
              placeholder="Ex. Galo Esmeralda"
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="PAI">
              <input
                name="pai"
                value={form.pai}
                onChange={onFieldChange}
                placeholder="código / ID"
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </Campo>
            <Campo label="MÃE">
              <input
                name="mae"
                value={form.mae}
                onChange={onFieldChange}
                placeholder="código / ID"
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </Campo>
          </div>

          <Campo label="CRISTA*">
            <select
              name="crista"
              value={form.crista}
              onChange={onFieldChange}
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <Campo label="DATA DE NASCIMENTO*">
            <input
              name="nascimento"
              type="date"
              value={form.nascimento}
              onChange={onFieldChange}
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="SEXO">
              <select
                name="sexo"
                value={form.sexo}
                onChange={onFieldChange}
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="Indefinido">Indefinido</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
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
              <label htmlFor="ativo" className="font-semibold text-sm">
                Ativo reprodutivo
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-[0.12em] uppercase px-4 py-3 transition-colors shadow-[0_6px_0_rgba(0,90,0,0.8)]"
          >
            SALVAR NOVA AVE
          </button>
        </form>
      </div>

      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-[0.20em] uppercase text-center mb-6 drop-shadow-[0_3px_0_rgba(0,0,0,0.85)]">
          CADASTRAR AVE
        </h1>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-extrabold text-amber-800">
            TABELA DE AVES
          </h2>

          <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/80 px-3 py-2 min-w-[260px]">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-auto rounded-2xl border border-amber-200 bg-white/60">
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
                  key={a.anilha}
                  className="border-b last:border-0 border-amber-100"
                >
                  <Td>{a.anilha}</Td>
                  <Td>{a.nome}</Td>
                  <Td>{a.linhagem}</Td>
                  <Td>{a.sexo}</Td>
                  <Td>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        a.ativo
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {a.ativo ? "Ativo" : "Inativo"}
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
                        onClick={() => remover(a.anilha)}
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
    <th className={`px-4 py-3 text-sm font-bold ${className}`}>
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
  sexo: Sexo;
  ativo: boolean;
};

/* ===== Componente ===== */
export default function CadastroAve() {
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState<Ave[]>([
    {
      anilha: "GSB001",
      nome: "Turmalina",
      linhagem: "Galo Esmeralda",
      pai: "",
      mae: "",
      crista: "Rosa",
      plumagem: "Carijó",
      peso: 2150,
      nascimento: "2025-01-10",
      sexo: "Fêmea",
      ativo: true,
    },
  ]);

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
    sexo: "Indefinido",
    ativo: true,
  });

  const filtrados = useMemo(() => {
    const q = normalizar(busca);
    if (!q) return lista;
    return lista.filter((a) =>
      [a.anilha, a.nome, a.linhagem].some((v) =>
        normalizar(String(v)).includes(q)
      )
    );
  }, [busca, lista]);

  /* ===== Utils ===== */
  function gerarAnilha() {
    return `GSB${String(Math.floor(1 + Math.random() * 999)).padStart(
      3,
      "0"
    )}`;
  }

  function normalizar(t: string) {
    return (t || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* ===== Handlers ===== */
  function onFieldChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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
      setForm((old) => ({
        ...old,
        sexo: (el as HTMLSelectElement).value as Sexo,
      }));
      return;
    }

    setForm((old) => ({ ...old, [name]: el.value }));
  }

  function salvarNovaAve(e: FormEvent<HTMLFormElement>) {
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

    const nova: Ave = {
      anilha: form.anilha || gerarAnilha(),
      nome: form.nome.trim(),
      linhagem: form.linhagem.trim(),
      pai: form.pai.trim() ? form.pai.trim() : undefined,
      mae: form.mae.trim() ? form.mae.trim() : undefined,
      crista: form.crista,
      plumagem: form.plumagem,
      peso: form.peso,
      nascimento: form.nascimento,
      sexo: form.sexo,
      ativo: form.ativo,
    };

    setLista((prev) => [nova, ...prev]);

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
    if (window.confirm(`Remover ${anilha}?`)) {
      setLista((prev) => prev.filter((a) => a.anilha !== anilha));
    }
  }

  /* ===== Render ===== */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[430px,1fr] gap-8">
      {/* FORMULÁRIO – CARD ESQUERDO */}
      <div className="rounded-[32px] border-[3px] border-amber-300 bg-[rgb(250,240,220)]/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)] px-7 py-6">
        {/* cabeçalho do card, igual estilo que vamos usar no outro título */}
        <div className="mb-5 pb-3 border-b border-amber-300">
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-[0.20em] uppercase text-center drop-shadow-[0_3px_0_rgba(0,0,0,0.85)]">
            CADASTRAR NOVA AVE
          </h2>
        </div>

        <form onSubmit={salvarNovaAve} className="space-y-4">
          <Campo label="NOME / ID*">
            <input
              name="nome"
              value={form.nome}
              onChange={onFieldChange}
              placeholder="Ex. galo doido"
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <Campo label="LINHAGEM*">
            <input
              name="linhagem"
              value={form.linhagem}
              onChange={onFieldChange}
              placeholder="Ex. Galo Esmeralda"
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="PAI">
              <input
                name="pai"
                value={form.pai}
                onChange={onFieldChange}
                placeholder="código / ID"
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </Campo>
            <Campo label="MÃE">
              <input
                name="mae"
                value={form.mae}
                onChange={onFieldChange}
                placeholder="código / ID"
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </Campo>
          </div>

          <Campo label="CRISTA*">
            <select
              name="crista"
              value={form.crista}
              onChange={onFieldChange}
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <Campo label="DATA DE NASCIMENTO*">
            <input
              name="nascimento"
              type="date"
              value={form.nascimento}
              onChange={onFieldChange}
              className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </Campo>

          <div className="grid grid-cols-2 gap-3">
            <Campo label="SEXO">
              <select
                name="sexo"
                value={form.sexo}
                onChange={onFieldChange}
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none text-sm shadow-inner focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="Indefinido">Indefinido</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
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
              <label htmlFor="ativo" className="font-semibold text-sm">
                Ativo reprodutivo
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-[0.12em] uppercase px-4 py-3 transition-colors shadow-[0_6px_0_rgba(0,90,0,0.8)]"
          >
            SALVAR NOVA AVE
          </button>
        </form>
      </div>

      {/* TABELA – CARD DIREITO */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        {/* AGORA MESMO ESTILO DE ESCRITA DO CABEÇALHO ESQUERDO */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-amber-700 tracking-[0.20em] uppercase text-center mb-6 drop-shadow-[0_3px_0_rgba(0,0,0,0.85)]">
          CADASTRAR AVE
        </h1>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-extrabold text-amber-800">
            TABELA DE AVES
          </h2>

          <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/80 px-3 py-2 min-w-[260px]">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="mt-4 overflow-auto rounded-2xl border border-amber-200 bg-white/60">
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
                  key={a.anilha}
                  className="border-b last:border-0 border-amber-100"
                >
                  <Td>{a.anilha}</Td>
                  <Td>{a.nome}</Td>
                  <Td>{a.linhagem}</Td>
                  <Td>{a.sexo}</Td>
                  <Td>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        a.ativo
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-stone-200 text-stone-700"
                      }`}
                    >
                      {a.ativo ? "Ativo" : "Inativo"}
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
                        onClick={() => remover(a.anilha)}
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
        </div>
      </div>
    </div>
  );
}

/* ===== COMPONENTES DE APOIO ===== */

function Th({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th className={`px-4 py-3 text-sm font-bold ${className}`}>
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

