import { useEffect, useState } from "react";
import { BackupApi, type BackupDto } from "./api/backupApi";

type LogItem = {
  id: number | string;
  status: string;
  data: string;
  descricao: string;
};

export default function Backup() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [criando, setCriando] = useState(false);

  // Carrega logs do backend ao abrir a tela
  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const lista = await BackupApi.listar();
        setLogs(lista.map(mapBackupToLog));
      } catch (err) {
        console.error("Erro ao carregar backups:", err);
        alert("Erro ao carregar histórico de backups.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  async function criarBackup() {
    try {
      setCriando(true);
      const criado = await BackupApi.criar();
      const log = mapBackupToLog(criado);

      // adiciona no topo da lista
      setLogs((prev) => [log, ...prev]);

      alert("Backup criado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar backup:", err);
      alert("Erro ao criar backup.");
    } finally {
      setCriando(false);
    }
  }

  function restaurarBackup() {
    alert("Função de restauração ainda não implementada (mock).");
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">

      {/* CARD PRINCIPAL */}
      <div
        className="
          rounded-[32px] border-[3px] border-amber-300 
          bg-[rgb(250,240,220)]/95 
          shadow-[0_18px_40px_rgba(0,0,0,0.45)]
          px-8 py-6
        "
      >
        <div className="mb-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-amber-800 tracking-[0.18em] uppercase drop-shadow-[0_3px_0_rgba(0,0,0,0.75)]">
            Backup & Restauração
          </h2>
          <p className="mt-3 text-sm md:text-base text-stone-700 max-w-2xl mx-auto">
            Gerencie a exportação e importação do banco de dados SQLite do sistema 
            <span className="font-semibold"> Recanto Imperial GSB Manager</span>.
          </p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-stretch justify-center gap-8">
          <div className="flex-1 flex flex-col items-center text-center">
            <button
              onClick={criarBackup}
              disabled={criando}
              className="
                w-full md:w-auto
                rounded-2xl bg-emerald-600 hover:bg-emerald-700 
                text-white font-extrabold tracking-[0.14em] uppercase
                px-6 py-3
                shadow-[0_5px_0_rgba(0,70,0,0.85)]
                active:translate-y-[1px]
                disabled:opacity-60
              "
            >
              {criando ? "CRIANDO..." : "Criar Backup"}
            </button>
            <p className="text-stone-700 mt-3 text-sm max-w-xs">
              Exporta o arquivo do banco SQLite para a pasta configurada no backend
              (ex.: <span className="font-semibold">/backups/recanto</span>).
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center text-center">
            <button
              onClick={restaurarBackup}
              className="
                w-full md:w-auto
                rounded-2xl bg-emerald-600 hover:bg-emerald-700 
                text-white font-extrabold tracking-[0.14em] uppercase
                px-6 py-3
                shadow-[0_5px_0_rgba(0,70,0,0.85)]
                active:translate-y-[1px]
              "
            >
              Restaurar Backup
            </button>
            <p className="text-stone-700 mt-3 text-sm max-w-xs">
              Importa um arquivo de backup existente e substitui o banco atual
              (ainda em modo demonstração).
            </p>
          </div>
        </div>
      </div>

      {/* CARD DE LOGS */}
      <div
        className="
          rounded-[32px] border-[3px] border-amber-300 
          bg-[rgb(250,240,220)]/95 
          shadow-[0_18px_40px_rgba(0,0,0,0.45)]
          px-8 py-6
        "
      >
        <h3 className="text-2xl font-extrabold text-amber-800 tracking-[0.18em] uppercase mb-5 text-center drop-shadow-[0_3px_0_rgba(0,0,0,0.75)]">
          Logs de Backups
        </h3>

        {carregando ? (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center text-stone-600">
            Carregando backups...
          </div>
        ) : logs.length === 0 ? (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center text-stone-600">
            Nenhum backup registrado ainda.
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="
                  rounded-2xl border border-amber-200 
                  bg-amber-100/80 px-4 py-3 
                  flex flex-col gap-1
                "
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold bg-emerald-200 text-emerald-800">
                      {log.status.toUpperCase()}
                    </span>
                    <span className="font-semibold text-stone-800">
                      {log.data}
                    </span>
                  </span>
                </div>
                <p className="text-stone-700 text-sm">
                  {log.descricao}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Helpers ===== */

function mapBackupToLog(b: BackupDto): LogItem {
  const dataFormatada = formatarDataBR(b.dataCriacao || "");

  return {
    id: b.id ?? `${Date.now()}-${Math.random()}`,
    status: b.status || "Completo",
    data: dataFormatada || "—",
    descricao:
      b.descricao ||
      (dataFormatada
        ? `Backup completo realizado em ${dataFormatada}`
        : "Backup registrado."),
  };
}

function formatarDataBR(iso: string) {
  if (!iso) return "";
  const parteData = iso.split("T")[0]; // "yyyy-MM-dd"
  const [y, m, d] = parteData.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}
