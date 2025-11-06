import { useState } from "react";
import CadastroAve from "./CadastroAve";
import RegistrarCruzamento from "./RegistrarCruzamento";
import EventosPlantel from "./EventosPlantel";

type Page =
  | "cadastro"
  | "cruzamento"
  | "eventos"
  | "relatorios"
  | "pesquisa"
  | "backup";

const PAGE_TITLE: Record<Page, string> = {
  cadastro: "CADASTRAR AVE",
  cruzamento: "REGISTRAR CRUZAMENTO",
  eventos: "EVENTOS DO PLANTEL",
  relatorios: "RELATÓRIO E EXPORTAÇÃO",
  pesquisa: "PESQUISA E FILTROS",
  backup: "BACKUP E RESTAURAÇÃO",
};

export default function App() {
  const [page, setPage] = useState<Page>("cadastro");

  return (
    <div className="min-h-screen w-full bg-[rgb(242,233,217)] text-stone-800">
      {/* Topo fixo (único) */}
      <div className="px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block rounded-full bg-amber-200/70 px-3 py-1 text-sm font-semibold text-amber-900 shadow-sm">
            RECANTO IMPERIAL GSB
          </span>
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-stone-700 shadow-sm">
            MANAGER
          </span>
        </div>
      </div>

      {/* Menu simples */}
      <nav className="mx-6 md:mx-10 rounded-2xl bg-amber-200/60 border border-amber-300 shadow p-2">
        <ul className="flex flex-wrap gap-2 md:gap-3">
          <NavBtn active={page==="cadastro"} onClick={() => setPage("cadastro")}>Cadastrar Ave</NavBtn>
          <NavBtn active={page==="cruzamento"} onClick={() => setPage("cruzamento")}>Registrar Cruzamento</NavBtn>
          <NavBtn active={page==="eventos"} onClick={() => setPage("eventos")}>Eventos do Plantel</NavBtn>
          <NavBtn active={page==="relatorios"} onClick={() => setPage("relatorios")}>Relatório & Exportação</NavBtn>
          <NavBtn active={page==="pesquisa"} onClick={() => setPage("pesquisa")}>Pesquisa & Filtros</NavBtn>
          <NavBtn active={page==="backup"} onClick={() => setPage("backup")}>Backup & Restauração</NavBtn>
        </ul>
      </nav>

      {/* Título da página */}
      <div className="px-6 md:px-10 py-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide text-stone-900">
          {PAGE_TITLE[page]}
        </h1>
      </div>

      {/* Conteúdo da página (somente conteúdo, sem cabeçalho interno) */}
      <div className="px-6 md:px-10 pb-12">
         {page === "cadastro" && <CadastroAve />}
         {page === "cruzamento" && <RegistrarCruzamento />}
         {page === "eventos" && <EventosPlantel />} {/* <-- aqui */}
         {page === "relatorios" && <Placeholder text="Em breve: relatórios e exportação." />}
         {page === "pesquisa" && <Placeholder text="Em breve: pesquisa avançada com filtros." />}
         {page === "backup" && <Placeholder text="Em breve: backup local e restauração." />}
      </div>
    </div>
  );
}

function NavBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition
        ${active ? "bg-amber-600 text-white shadow" : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"}`}
      >
        {children}
      </button>
    </li>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-[rgb(248,241,227)] shadow-md p-8">
      <p className="text-stone-700">{text}</p>
    </div>
  );
}
