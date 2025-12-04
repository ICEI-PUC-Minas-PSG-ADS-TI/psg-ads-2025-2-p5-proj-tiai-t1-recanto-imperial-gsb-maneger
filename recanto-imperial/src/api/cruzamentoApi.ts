// src/api/cruzamentoApi.ts
import { apiGet, apiPost } from "./avesApi";

/** ===== Tipos que o backend devolve ===== **/

export interface CruzamentoAveItemDto {
  aveId: number;
  papel: string;
  ave?: {
    id: number;
    anilha: string;
    nome: string;
    linhagem: string;
  } | null;
}

export interface CruzamentoDto {
  id: number;
  data: string;              // ISO, ex: "2025-12-03T18:40:10Z"
  observacoes: string;
  cruzamentoAves: CruzamentoAveItemDto[];
}

/** ===== Payload para criar ===== **/

export interface CreateCruzamentoRequest {
  observacoes: string;
  aves: {
    aveId: number;
    papel: string;          // "Macho" / "Fêmea"
  }[];
}

/** ===== Chamadas de API ===== **/

const CruzamentoApi = {
  listar: () => apiGet<CruzamentoDto[]>("/Cruzamentos"),
  criar: (body: CreateCruzamentoRequest) =>
    apiPost<CreateCruzamentoRequest, CruzamentoDto>("/Cruzamentos", body),
};

export default CruzamentoApi;
