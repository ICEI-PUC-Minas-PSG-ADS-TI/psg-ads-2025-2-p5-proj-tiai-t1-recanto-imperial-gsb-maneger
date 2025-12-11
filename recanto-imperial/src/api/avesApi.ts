// src/api/avesApi.ts
export const API_BASE_URL = "http://localhost:5048/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro HTTP ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

// Helpers genéricos (também usados por outras APIs)
export function apiGet<T>(path: string) {
  return request<T>(path);
}

export function apiPost<TBody, TResponse>(path: string, body: TBody) {
  return request<TResponse>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function apiPut<TBody, TResponse>(path: string, body: TBody) {
  return request<TResponse>(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function apiDelete(path: string) {
  return request<void>(path, { method: "DELETE" });
}

// ===== Tipos de AVE =====

export interface AveDto {
  id: number;
  anilha: string;
  nome: string;
  linhagem: string;
  sexo: string | null;
  dataNascimento: string | null;
  peso: number | null;
  fotoPath: string | null;
  statusDescricao: string | null;

  paiId?: number | null;
  maeId?: number | null;
}

export interface CreateAveRequest {
  anilha: string;
  nome: string;
  linhagem: string;
  sexo: string;            // "Macho" ou "Femea"
  dataNascimento: string;  // "yyyy-MM-dd"
  peso?: number | null;
  fotoPath?: string | null;

  paiId?: number | null;
  maeId?: number | null;
}

export interface UpdateAveRequest {
  id: number;
  anilha: string;
  nome: string;
  linhagem: string;
  sexo: string;                 // "Macho" ou "Femea"
  dataNascimento: string | null;
  peso?: number | null;
  fotoPath?: string | null;
  statusDescricao?: string | null;
}

// ===== API específica de AVES =====

export const AveApi = {
  listar: () => apiGet<AveDto[]>("/Aves"),
  obterPorId: (id: number) => apiGet<AveDto>(`/Aves/${id}`),
  criar: (data: CreateAveRequest) =>
    apiPost<CreateAveRequest, AveDto>("/Aves", data),
  atualizar: (id: number, data: UpdateAveRequest) =>
    apiPut<UpdateAveRequest, AveDto>(`/Aves/${id}`, data),
  excluir: (id: number) => apiDelete(`/Aves/${id}`),

  
};
