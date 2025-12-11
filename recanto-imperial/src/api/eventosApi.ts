// src/api/eventosApi.ts
import { apiGet } from "./avesApi";

export interface EventoDto {
  id: number;
  aveId: number;
  tipoEvento: string;
  observacoes: string | null;
  data: string; 
}

export const EventoApi = {
  listar: () => apiGet<EventoDto[]>("/Eventos"),
};
