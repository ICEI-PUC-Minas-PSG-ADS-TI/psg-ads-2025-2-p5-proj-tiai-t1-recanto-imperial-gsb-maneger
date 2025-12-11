import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type EventoTipo = "Nascimento" | "Óbito" | "Venda";

interface Evento {
  id: string;
  tipo: EventoTipo;
  data: string;        // yyyy-mm-dd
  descricao: string;   // breve descrição (ex.: “Ex. galo doido”)
  detalhes?: string;   // texto secundário da linha
}

export default function EventosPlantel() {
  const [aba, setAba] = useState<EventoTipo>("Nascimento");
  const [filtro, setFiltro] = useState<{ data: string; descricao: string }>({
    data: "",
    descricao: "",
  });

  // Mock inicial
  const [historico] = useState<Evento[]>([
    { id: genId(), tipo: "Nascimento", data: "2025-09-16", descricao: "Nova ave registrada", detalhes: "Nova ave registrada no sistema." },
    { id: genId(), tipo: "Nascimento", data: "2025-09-16", descricao: "Registro automático", detalhes: "Nova ave registrada no sistema." },
    { id: genId(), tipo: "Óbito",       data: "2025-08-03", descricao: "Ave 302",           detalhes: "Causa natural." },
    { id: genId(), tipo: "Venda",       data: "2025-07-22", descricao: "Lote 12",           detalhes: "Venda para criador parceiro." },
  ]);

  const filtrados = useMemo(() => {
    return historico.filter((e) => {
      if (e.tipo !== aba) return false;
      if (filtro.data && e.data !== filtro.data) return false;
      if (filtro.descricao && !e.descricao.toLowerCase().includes(filtro.descricao.toLowerCase())) return false;
      return true;
    });
  }, [historico, aba, filtro]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFiltro((old) => ({ ...old, [name]: value }));
  }

  function onBuscar(e: FormEvent) {
    e.preventDefault();
    // Como a busca é “ao digitar”, aqui não precisamos fazer nada.
  }

  return (
    <div className="w-full">
      {/* Abas */}
      <div className="flex items-center gap-4 mb-6">
        <AbaButton active={aba === "Nascimento"} onClick={() => setAba("Nascimento")}>NASCIMENTO</AbaButton>
        <AbaButton active={aba === "Óbito"} onClick={() => setAba("Óbito")}>ÓBITO</AbaButton>
        <AbaButton active={aba === "Venda"} onClick={() => setAba("Venda")}>VENDA</AbaButton>
      </div>

      {/* Filtro / Busca */}
      <div className="rounded-[28px] border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-6 max-w-5xl">
        <form onSubmit={onBuscar} className="grid grid-cols-1 md:grid-cols-[240px,1fr,140px] gap-4 items-end">
          <div>
            <label className="font-extrabold text-stone-800">DATA</label>
            <input
              type="date"
              name="data"
              value={filtro.data}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="font-extrabold text-stone-800">DESCRIÇÃO</label>
            <input
              name="descricao"
              placeholder="Ex. galo doido"
              value={filtro.descricao}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-amber-200 bg-white/80 px-3 py-2 outline-none"
            />
          </div>

          <button
            type="submit"
            className="h-[42px] md:h-[44px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold tracking-wide"
          >
            BUSCAR
          </button>
        </form>

        {/* Lista de resultados */}
        <div className="mt-6 space-y-4">
          {filtrados.map((e) => (
            <LinhaEvento key={e.id} tipo={e.tipo} data={e.data} titulo={tituloEvento(e)} subtitulo={e.detalhes || "-"} />
          ))}

          {filtrados.length === 0 && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-stone-600">
              Nenhum evento encontrado para os filtros atuais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function AbaButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-5 py-2 font-extrabold tracking-wide transition
      ${active ? "bg-amber-700 text-amber-50 shadow" : "bg-amber-300/60 hover:bg-amber-300 text-stone-800"}`}
    >
      {children}
    </button>
  );
}

function LinhaEvento({
  tipo,
  data,
  titulo,
  subtitulo,
}: {
  tipo: EventoTipo;
  data: string;
  titulo: string;
  subtitulo: string;
}) {
  const cor = tipo === "Nascimento" ? "bg-amber-200/70"
            : tipo === "Óbito"       ? "bg-stone-300/60"
            :                         "bg-amber-300/70";

  return (
    <div className={`rounded-2xl border border-amber-200 ${cor} p-4`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-black tracking-wide text-amber-900">
          {titulo.toUpperCase()}
        </h3>
        <span className="font-black text-stone-800">
          {formatarDataBR(data)}
        </span>
      </div>
      <p className="text-stone-700 mt-2">{subtitulo}</p>
    </div>
  );
}

/* ---------- utils ---------- */

function tituloEvento(e: Evento) {
  switch (e.tipo) {
    case "Nascimento": return "Nascimento nova ave";
    case "Óbito":      return "Óbito de animal";
    case "Venda":      return "Venda registrada";
    default:           return e.descricao || "Evento";
  }
}

function formatarDataBR(iso: string) {
  if (!iso) return "-";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function genId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}
