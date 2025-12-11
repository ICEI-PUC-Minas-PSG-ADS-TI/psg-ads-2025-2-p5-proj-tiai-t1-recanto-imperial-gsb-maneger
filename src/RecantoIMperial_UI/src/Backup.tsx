import { useState } from "react";

export default function Backup() {
  const [logs, setLogs] = useState([
    {
      status: "Completo",
      data: "16/09/2025",
      descricao: "Backup completo feito no dia 16/09/2025",
    },
    {
      status: "Completo",
      data: "15/09/2025",
      descricao: "Backup completo feito no dia 15/09/2025",
    },
  ]);

  function criarBackup() {
    const hoje = new Date().toLocaleDateString("pt-BR");
    const novo = {
      status: "Completo",
      data: hoje,
      descricao: `Backup completo feito no dia ${hoje}`,
    };
    setLogs((prev) => [novo, ...prev]);
    alert("Backup criado com sucesso!");
  }

  function restaurarBackup() {
    alert("Função de restauração ainda não implementada (mock).");
  }

  return (
    <div className="min-h-screen w-full bg-[rgb(242,233,217)] text-stone-800 flex flex-col items-center py-10 px-4">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-extrabold text-amber-900 mb-2">
          BACKUP E RESTAURAÇÃO
        </h1>
        <p className="text-stone-600 font-medium text-center max-w-md">
          Gerencie exportação e importação do banco de dados SQLite do sistema.
        </p>
      </div>

      {/* Botões principais */}
      <div className="bg-[rgb(248,241,227)] border-2 border-amber-200 rounded-3xl shadow-md p-8 w-full max-w-3xl mb-8 text-center">
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Botão Criar */}
          <div className="flex flex-col items-center">
            <button
              onClick={criarBackup}
              className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-lg px-6 py-3 rounded-xl shadow-md"
            >
              CRIAR BACKUP
            </button>
            <p className="text-stone-700 mt-2 text-sm">
              exporta o banco SQLite para a pasta escolhida.
            </p>
          </div>

          {/* Botão Restaurar */}
          <div className="flex flex-col items-center">
            <button
              onClick={restaurarBackup}
              className="bg-green-600 hover:bg-green-700 text-white font-extrabold text-lg px-6 py-3 rounded-xl shadow-md"
            >
              RESTAURAR BACKUP
            </button>
            <p className="text-stone-700 mt-2 text-sm">
              importa um banco existente.
            </p>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-[rgb(248,241,227)] border-2 border-amber-200 rounded-3xl shadow-md p-6 w-full max-w-3xl">
        <h2 className="text-xl font-extrabold text-amber-900 mb-4">
          LOGS DE BACKUPS
        </h2>

        <div className="space-y-3">
          {logs.map((log, i) => (
            <div
              key={i}
              className="bg-amber-100/60 border border-amber-200 rounded-xl px-4 py-3 text-left"
            >
              <p className="font-extrabold text-amber-900">
                {log.status.toUpperCase()} – {log.data}
              </p>
              <p className="text-stone-700 text-sm">{log.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
