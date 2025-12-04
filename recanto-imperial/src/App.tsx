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
      <TopBar page={page} onChangePage={setPage} />

      {/* TÍTULO */}
      <div className="px-4 md:px-8 mt-3 mb-6 flex justify-center">
        <div
          className="
          inline-flex items-center justify-center 
          rounded-3xl px-4 sm:px-6 md:px-10 py-2.5 md:py-4
          bg-black/55
          shadow-[0_8px_20px_rgba(0,0,0,0.7)]
          max-w-[95vw]
        "
        >
          <h1
            className="
            text-xl sm:text-2xl md:text-4xl lg:text-5xl 
            font-extrabold tracking-[0.24em]
            text-amber-200 text-center
            drop-shadow-[0_3px_0_rgba(0,0,0,0.9)]
          "
          >
            {PAGE_TITLE[page]}
          </h1>
        </div>
      </div>

      {/* ★★★ PARTE DE BAIXO — MANTIDA DO JEITO ORIGINAL ★★★ */}
      <div className="px-4 sm:px-6 md:px-10 pb-12">
        {renderPage()}
      </div>
    </div>
  );
}

function TopBar({
  page,
  onChangePage,
}: {
  page: Page;
  onChangePage: (p: Page) => void;
}) {
  return (
    <header
      className="
        w-full 
        flex flex-col lg:flex-row 
        items-center lg:items-center 
        justify-between 
        gap-3 md:gap-4 
        px-4 md:px-8 pt-3 pb-2
      "
    >
      {/* LOGO + IMAGEM */}
      <div className="flex items-center gap-2 md:gap-4">
        <img
          src={IMG_LOGO}
          alt="Recanto Imperial GSB"
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 drop-shadow-xl"
        />
        <img
          src={IMG_NAME}
          alt="Recanto Imperial GSB Manager"
          className="w-[190px] sm:w-[240px] md:w-[320px] lg:w-[360px] h-auto drop-shadow-xl"
        />
      </div>

      {/* MENU MADEIRA */}
      <div className="relative w-full lg:flex-1 flex justify-center px-1 mt-2 lg:mt-0">
        <img
          src={IMG_WOOD}
          alt="Menu"
          className="
            w-full sm:w-[400px] md:w-[600px] lg:w-[900px]
            h-auto object-contain drop-shadow-lg
          "
        />

        {/* NAV COM SCROLL NO MOBILE */}
        <nav className="absolute inset-0 flex items-center justify-center px-1">
          <div className="w-full overflow-x-auto">
            <ul
              className="
                flex flex-nowrap md:flex-wrap justify-center 
                gap-1 md:gap-2 
                text-[9px] sm:text-[10px] md:text-xs 
                font-extrabold tracking-[0.18em] 
                uppercase whitespace-nowrap md:whitespace-normal 
                select-none leading-tight
              "
            >
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
          </div>
        </nav>
      </div>

      {/* BANDEIRAS */}
      <div className="flex items-center gap-3 md:gap-4 mt-2 lg:mt-0">
        <img
          src={IMG_BRASIL}
          alt="Brasil"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-xl"
        />
        <img
          src={IMG_MINAS}
          alt="Minas Gerais"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 drop-shadow-xl"
        />
      </div>
    </header>
  );
}

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
          px-2 sm:px-2.5 md:px-3 py-1.5 
          text-[9px] sm:text-[10px]
          whitespace-normal break-words
          transition-all duration-150 rounded-md
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
