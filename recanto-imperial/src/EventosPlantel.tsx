import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { EventoApi, type EventoDto } from "./api/eventosApi";

type EventoTipo = "Nascimento" | "Óbito" | "Venda";

interface Evento {
  id: number;
  tipo: EventoTipo;
  data: string; // yyyy-MM-dd
  descricao: string;
  detalhes?: string;
}

export default function EventosPlantel() {
  const [aba, setAba] = useState<EventoTipo>("Nascimento");
  const [filtro, setFiltro] = useState({ data: "", descricao: "" });

  const [historico, setHistorico] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(false);

  // Carrega eventos do backend
  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const itens = await EventoApi.listar();
        setHistorico(itens.map(mapToEventoView));
      } catch (err) {
        console.error("Erro ao carregar eventos:", err);
        alert("Erro ao carregar eventos do plantel.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const filtrados = useMemo(() => {
    return historico.filter((e) => {
      if (e.tipo !== aba) return false;
      if (filtro.data && e.data !== filtro.data) return false;
      if (
        filtro.descricao &&
        !e.descricao.toLowerCase().includes(filtro.descricao.toLowerCase())
      )
        return false;
      return true;
    });
  }, [historico, aba, filtro]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFiltro((old) => ({ ...old, [name]: value }));
  }

  function onBuscar(e: FormEvent) {
    e.preventDefault();
    // filtros já são aplicados automaticamente pelo useMemo
  }

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-5xl w-full">
        {/* Abas */}
        <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
          <AbaButton
            active={aba === "Nascimento"}
            onClick={() => setAba("Nascimento")}
          >
            NASCIMENTO
          </AbaButton>
          <AbaButton active={aba === "Óbito"} onClick={() => setAba("Óbito")}>
            ÓBITO
          </AbaButton>
          <AbaButton active={aba === "Venda"} onClick={() => setAba("Venda")}>
            VENDA
          </AbaButton>
        </div>

        <div
          className="
          rounded-[32px] border-[3px] border-amber-300 
          bg-[rgb(250,240,220)]/95 shadow-[0_18px_40px_rgba(0,0,0,0.45)]
          p-8
        "
        >
          {/* Filtros */}
          <form
            onSubmit={onBuscar}
            className="grid grid-cols-1 md:grid-cols-[240px,1fr,140px] gap-6 items-end"
          >
            <div>
              <label className="font-extrabold text-stone-900 text-xs tracking-[0.16em] uppercase">
                DATA
              </label>
              <input
                type="date"
                name="data"
                value={filtro.data}
                onChange={onChange}
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none shadow-inner focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-extrabold text-stone-900 text-xs tracking-[0.16em] uppercase">
                DESCRIÇÃO
              </label>
              <input
                name="descricao"
                placeholder="Ex. nova ave"
                value={filtro.descricao}
                onChange={onChange}
                className="mt-1 w-full rounded-2xl border border-amber-300 bg-white/90 px-3 py-2 outline-none shadow-inner focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="
                h-[46px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 
                text-white font-extrabold tracking-[0.14em] uppercase
                shadow-[0_5px_0_rgba(0,60,0,0.75)]
              "
            >
              Buscar
            </button>
          </form>

          {/* Lista */}
          <div className="mt-8 space-y-5">
            {carregando && (
              <div className="rounded-2xl bg-amber-50 border border-amber-300 p-5 text-center text-stone-700">
                Carregando eventos...
              </div>
            )}

            {!carregando &&
              filtrados.map((e) => (
                <LinhaEvento
                  key={e.id}
                  tipo={e.tipo}
                  data={e.data}
                  titulo={tituloEvento(e)}
                  subtitulo={e.detalhes || "-"}
                />
              ))}

            {!carregando && filtrados.length === 0 && (
              <div
                className="
                rounded-2xl bg-amber-50 border border-amber-300 
                p-5 text-stone-700 text-center
              "
              >
                Nenhum evento encontrado para os filtros aplicados.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Helpers de UI ===== */

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
      className={`
        px-6 py-3 rounded-2xl font-extrabold uppercase tracking-[0.14em]
        transition-all duration-150 shadow-[0_3px_0_rgba(0,0,0,0.7)]
        ${
          active
            ? "bg-amber-700 text-yellow-200 shadow-inner"
            : "bg-amber-500/70 text-white hover:bg-amber-600"
        }
      `}
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
  const cor =
    tipo === "Nascimento"
      ? "bg-green-100/80"
      : tipo === "Óbito"
      ? "bg-red-200/70"
      : "bg-yellow-200/70";

  return (
    <div
      className={`
        rounded-2xl border-[2px] border-amber-300 p-5
        ${cor} shadow-md
      `}
    >
      <div className="flex flex-wrap items-center justify-between">
        <h3
          className="
          font-black tracking-[0.16em] text-stone-900 
          drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]
        "
        >
          {titulo.toUpperCase()}
        </h3>

        <span className="font-extrabold text-stone-800">
          {formatarDataBR(data)}
        </span>
      </div>

      <p className="text-stone-700 mt-2 font-medium">{subtitulo}</p>
    </div>
  );
}

function tituloEvento(e: Evento) {
  switch (e.tipo) {
    case "Nascimento":
      return "Nascimento registrado";
    case "Óbito":
      return "Óbito de animal";
    case "Venda":
      return "Venda realizada";
    default:
      return e.descricao || "Evento";
  }
}

/* ===== Mapeamento e formatações ===== */

function formatarDataBR(iso: string) {
  if (!iso) return "-";
  // se vier "2025-12-11" ou "2025-12-11T10:20:30"
  const soData = iso.split("T")[0];
  const [y, m, d] = soData.split("-");
  return `${d}/${m}/${y}`;
}

// Converte o DTO do backend para o formato usado na tela
function mapToEventoView(dto: EventoDto): Evento {
  const tipo = mapTipo(dto.tipoEvento);

  // normalizar data para yyyy-MM-dd
  const dataIso = dto.data?.split("T")[0] ?? "";

  return {
    id: dto.id,
    tipo,
    data: dataIso,
    descricao: dto.observacoes || dto.tipoEvento || "",
    detalhes: `Ave #${dto.aveId} - ${dto.observacoes || "Sem detalhes"}`,
  };
}

// Converte string do backend -> EventoTipo
function mapTipo(raw: string): EventoTipo {
  const t = (raw || "").toLowerCase();

  if (t.includes("nasc")) return "Nascimento";
  if (t.includes("obito") || t.includes("óbito") || t.includes("morte"))
    return "Óbito";
  if (t.includes("vend")) return "Venda";

  // fallback: considera nascimento
  return "Nascimento";
}
