import { useState, type ReactNode } from "react";
import CadastroAve from "./CadastroAve";
import RegistrarCruzamento from "./RegistrarCruzamento";
import EventosPlantel from "./EventosPlantel";
import Relatorio from "./Relatorio";
import Backup from "./Backup";

type Page =
  | "cadastro"
  | "cruzamento"
  | "eventos"
  | "relatorios"
  | "pesquisa"
  | "backup";

// 🔹 caminhos das imagens
const IMG_LOGO = "/logo-recanto.png";
const IMG_NAME = "/nome-recanto.png";
const IMG_WOOD = "/woodbar.png";
const IMG_BRASIL = "/icon-brasil.png";
const IMG_MINAS = "/icon-minas.png";

const PAGE_TITLE: Record<Page, string> = {
  cadastro: "CADASTRAR AVE",
  cruzamento: "REGISTRAR CRUZAMENTO",
  eventos: "EVENTOS DO PLANTEL",
  relatorios: "RELATÓRIO E EXPORTAÇÃO",
  pesquisa: "PESQUISA E FILTROS",
  backup: "BACKUP E RESTAURAÇÃO",
};

const NAV_ITEMS: Array<{ key: Page; label: string }> = [
  { key: "cadastro", label: "Cadastrar\nAve" },
  { key: "cruzamento", label: "Registrar\nCruzamento" },
  { key: "eventos", label: "Eventos do\nPlantel" },
  { key: "relatorios", label: "Relatório &\nExportação" },
  { key: "backup", label: "Backup &\nRestauração" },
];

export default function App() {
  const [page, setPage] = useState<Page>("cadastro");

  function renderPage(): ReactNode {
    switch (page) {
      case "cadastro":
        return <CadastroAve />;
      case "cruzamento":
        return <RegistrarCruzamento />;
      case "eventos":
        return <EventosPlantel />;
      case "relatorios":
        return <Relatorio />;
      case "backup":
        return <Backup />;
      default:
        return null;
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed text-stone-800"
      style={{ backgroundImage: "url('/Fundo.png')" }}
    >
      {/* TOPO */}
      <TopBar page={page} onChangePage={setPage} />

      {/* TÍTULO DESTACADO */}
      <div className="px-4 md:px-8 mt-2 mb-6 flex justify-center">
        <div className="
          inline-flex items-center justify-center 
          rounded-3xl px-6 md:px-10 py-3 md:py-4
          bg-black/55
          shadow-[0_8px_20px_rgba(0,0,0,0.7)]
        ">
          <h1 className="
            text-2xl md:text-4xl lg:text-5xl 
            font-extrabold 
            tracking-[0.28em]
            text-amber-200
            text-center
            drop-shadow-[0_3px_0_rgba(0,0,0,0.9)]
          ">
            {PAGE_TITLE[page]}
          </h1>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="px-6 md:px-10 pb-12">
        {renderPage()}
      </div>
    </div>
  );
}

/* ========= TOPO ========= */

function TopBar({
  page,
  onChangePage,
}: {
  page: Page;
  onChangePage: (p: Page) => void;
}) {
  return (
    <header className="w-full flex items-center justify-between px-4 md:px-8 pt-2 pb-2 gap-2">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3 md:gap-4">
        <img
          src={IMG_LOGO}
          alt="Recanto Imperial GSB"
          className="w-32 h-32 md:w-40 md:h-40 drop-shadow-xl"
        />
        <img
          src={IMG_NAME}
          alt="Recanto Imperial GSB Manager"
          className="w-[240px] md:w-[360px] h-auto object-contain drop-shadow-xl"
        />
      </div>

      {/* CENTRO */}
      <div className="relative flex-1 flex justify-center px-1">
        <img
          src={IMG_WOOD}
          alt="Menu"
          className="w-[400px] md:w-[900px] h-auto object-contain drop-shadow-lg"
        />

        <nav className="absolute inset-0 flex items-center justify-center px-2">
          <ul className="flex gap-1 md:gap-2 text-[10px] md:text-xs font-extrabold tracking-[0.18em] uppercase whitespace-normal select-none leading-tight">
            {NAV_ITEMS.map((item) => (
              <NavBtn
                key={item.key}
                active={page === item.key}
                onClick={() => onChangePage(item.key)}
              >
                {item.label}
              </NavBtn>
            ))}
          </ul>
        </nav>
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-3 md:gap-4">
        <img
          src={IMG_BRASIL}
          alt="Brasil"
          className="w-16 h-16 md:w-20 md:h-20 drop-shadow-xl"
        />
        <img
          src={IMG_MINAS}
          alt="Minas Gerais"
          className="w-16 h-16 md:w-20 md:h-20 drop-shadow-xl"
        />
      </div>
    </header>
  );
}

/* ========= NAV BUTTON ========= */

function NavBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <li className="leading-tight text-center">
      <button
        onClick={onClick}
        className={`
          uppercase tracking-[0.18em] font-extrabold 
          px-2 md:px-3 py-1.5 
          text-[9px] md:text-[10px]
          whitespace-normal break-words
          transition-all duration-150 rounded-md text-center
          drop-shadow-[0_2px_0_rgba(0,0,0,0.9)]
          ${
            active
              ? "text-yellow-300 bg-amber-800 shadow-inner"
              : "text-white hover:text-yellow-200 hover:bg-amber-700/70"
          }
        `}
      >
        {String(children)
          .split("\n")
          .map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
      </button>
    </li>
  );
}
