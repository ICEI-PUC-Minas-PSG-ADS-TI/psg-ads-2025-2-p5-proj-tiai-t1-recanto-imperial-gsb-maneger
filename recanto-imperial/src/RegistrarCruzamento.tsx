import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import CruzamentoApi, {
  type CruzamentoDto,
  type CreateCruzamentoRequest,
} from "./api/cruzamentoApi";

type ThProps = { children: ReactNode; className?: string };
type TdProps = { children: ReactNode; className?: string };

type FormState = {
  machoId: string;
  femeaId: string;
  filhoId: string;      // opcional
  observacao: string;
};

type CruzamentoView = {
  id: number;
  macho: string;
  femea: string;
  data: string;
  observacao: string;
};

export default function RegistrarCruzamento() {
  const [busca, setBusca] = useState("");
  const [historico, setHistorico] = useState<CruzamentoView[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    machoId: "",
    femeaId: "",
    filhoId: "",
    observacao: "",
  });

  useEffect(() => {
    carregarCruzamentos();
  }, []);

  async function carregarCruzamentos() {
    try {
      setLoading(true);
      const dados = await CruzamentoApi.listar();
      setHistorico(dados.map(mapToView));
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar cruzamentos.");
    } finally {
      setLoading(false);
    }
  }

  const filtrados = useMemo(() => {
    const q = (busca || "").toLowerCase();
    if (!q) return historico;
    return historico.filter((c) =>
      [c.macho, c.femea, c.data, c.observacao].some((v) =>
        (v || "").toLowerCase().includes(q)
      )
    );
  }, [busca, historico]);

  function onChangeField(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((old) => ({ ...old, [name]: value }));
  }

  async function salvar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.machoId.trim() || !form.femeaId.trim()) {
      alert("Preencha ao menos os IDs de Pai (Macho) e Mãe (Fêmea).");
      return;
    }

    if (!form.observacao.trim()) {
      alert("Preencha a observação.");
      return;
    }

    const machoId = Number(form.machoId);
    const femeaId = Number(form.femeaId);
    const filhoId = form.filhoId.trim() ? Number(form.filhoId) : null;

    if (!Number.isFinite(machoId) || !Number.isFinite(femeaId)) {
      alert("Os campos de Pai (Macho) e Mãe (Fêmea) devem ser números válidos.");
      return;
    }

    if (filhoId !== null && !Number.isFinite(filhoId)) {
      alert("O campo de Filhote deve ser um número válido, se preenchido.");
      return;
    }

    const aves: CreateCruzamentoRequest["aves"] = [
      // IMPORTANTE: papéis esperados pelo backend/validator
      { aveId: machoId, papel: "Pai" },
      { aveId: femeaId, papel: "Mae" },
    ];

    if (filhoId && filhoId > 0) {
      aves.push({ aveId: filhoId, papel: "Filho" });
    }

    const payload: CreateCruzamentoRequest = {
      observacoes: form.observacao.trim(),
      aves,
    };

    try {
      setLoading(true);
      const criado = await CruzamentoApi.criar(payload);
      const view = mapToView(criado);
      setHistorico((prev) => [view, ...prev]);
      setForm({ machoId: "", femeaId: "", filhoId: "", observacao: "" });
      alert("Cruzamento registrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert(
        "Erro ao salvar cruzamento. Verifique se as aves selecionadas existem e estão válidas no backend."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[440px,1fr,360px] gap-6">
      {/* FORMULÁRIO */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <h2 className="text-xl font-extrabold text-amber-800 mb-4">
          NOVO CRUZAMENTO
        </h2>

        <form onSubmit={salvar} className="space-y-3">
          <Campo label="PAI (ID da ave - Macho) *">
            <input
              name="machoId"
              value={form.machoId}
              onChange={onChangeField}
              placeholder="Ex. 1"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </Campo>

          <Campo label="MÃE (ID da ave - Fêmea) *">
            <input
              name="femeaId"
              value={form.femeaId}
              onChange={onChangeField}
              placeholder="Ex. 2"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </Campo>

          <Campo label="FILHOTE (ID da ave - opcional)">
            <input
              name="filhoId"
              value={form.filhoId}
              onChange={onChangeField}
              placeholder="Ex. 3"
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </Campo>

          <Campo label="OBSERVAÇÃO *">
            <textarea
              name="observacao"
              value={form.observacao}
              onChange={onChangeField}
              rows={5}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none resize-y"
              placeholder="Ex.: Baia 2, cobertura assistida…"
            />
          </Campo>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 transition-colors shadow-sm disabled:opacity-60"
          >
            {loading ? "SALVANDO..." : "SALVAR CRUZAMENTO"}
          </button>
        </form>
      </div>

      {/* HISTÓRICO */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <h2 className="text-xl font-extrabold text-amber-800 mb-4">
          HISTÓRICO DE CRUZAMENTOS
        </h2>

        <div className="overflow-auto rounded-2xl border border-amber-200 bg-white/60">
          <table className="w-full text-left">
            <thead className="bg-amber-100/80">
              <tr>
                <Th>MACHO (PAI)</Th>
                <Th>FÊMEA (MÃE)</Th>
                <Th>DATA</Th>
                <Th>OBSERVAÇÃO</Th>
              </tr>
            </thead>
            <tbody>
              {loading && historico.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-stone-500">
                    Carregando...
                  </td>
                </tr>
              )}

              {!loading &&
                filtrados.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-amber-100 last:border-0"
                  >
                    <Td>{c.macho}</Td>
                    <Td>{c.femea}</Td>
                    <Td>{c.data}</Td>
                    <Td className="max-w-[420px] truncate">
                      {c.observacao}
                    </Td>
                  </tr>
                ))}

              {!loading && filtrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-stone-500">
                    Nenhum resultado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BUSCA */}
      <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6">
        <div className="font-extrabold text-amber-800 text-xl mb-4">BUSCA</div>
        <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white/80 px-3 py-2">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Ex. Aruanã, Esmeralda..."
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
}

/* ===== Helpers ===== */

function mapToView(c: CruzamentoDto): CruzamentoView {
  const paiAves = c.cruzamentoAves.filter((a) =>
    a.papel?.toLowerCase().includes("pai")
  );
  const maeAves = c.cruzamentoAves.filter((a) => {
    const p = (a.papel || "").toLowerCase();
    return p.includes("mae") || p.includes("mãe");
  });

  const macho =
    paiAves.map((a) => a.ave?.nome || `Ave #${a.aveId}`).join(", ") || "—";

  const femea =
    maeAves.map((a) => a.ave?.nome || `Ave #${a.aveId}`).join(", ") || "—";

  return {
    id: c.id,
    macho,
    femea,
    data: formatarDataBR(c.data),
    observacao: c.observacoes,
  };
}

function formatarDataBR(iso: string) {
  if (!iso) return "-";
  const date = iso.split("T")[0];
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}

function Th({ children, className = "" }: ThProps) {
  return (
    <th className={`px-4 py-3 text-sm font-extrabold tracking-wide ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: TdProps) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}

function Campo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-2">
      <label className="font-extrabold text-stone-800">{label}</label>
      {children}
    </div>
  );
}
