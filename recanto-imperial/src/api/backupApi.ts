// src/api/backupsApi.ts
import { apiGet, apiPost } from "./avesApi";

export interface BackupDto {
  id: number;
  dataCriacao?: string | null;
  status?: string | null;
  descricao?: string | null;
  caminhoArquivo?: string | null;
}

export const BackupApi = {
  listar: () => apiGet<BackupDto[]>("/Backups"),

  // POST api/Backups  (sem body, só pra disparar a criação)
  criar: () => apiPost<{}, BackupDto>("/Backups", {}),
};
