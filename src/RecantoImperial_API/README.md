````markdown
# Recanto Imperial GSB Manager – API (.NET 8)

API responsável pela gestão do criatório **Recanto Imperial GSB** (raça Sertaneja Balão), permitindo:

- Cadastro e consulta de aves  
- Registro de cruzamentos (pai, mãe, filhos)  
- Registro de eventos (venda, óbito, etc.)  
- Montagem de árvore genealógica  
- Geração de relatórios em PDF (ficha da ave)  
- Testes e documentação via **Swagger**

---

## 🛠️ Tecnologias principais

- **.NET 8** – Plataforma principal da API  
- **ASP.NET Core Web API** – Exposição dos endpoints REST  
- **Entity Framework Core + SQLite** – Acesso e persistência de dados  
- **QuestPDF** – Geração de relatórios em PDF  
- **FluentValidation** – Validações de entrada  
- **Swagger (Swashbuckle)** – Documentação e testes interativos da API  
- **AutoMapper** – Mapeamento entre Models e DTOs  

---

## ✅ Pré-requisitos

Antes de rodar a API, instale:

- **.NET 8 SDK**  
- (Opcional) **EF Core Tools** globalmente, para usar comandos `dotnet ef`:
  ```bash
  dotnet tool install --global dotnet-ef
````

---

## 🚀 Como executar a API

1. **Clonar o repositório** (caso ainda não tenha)

   ```bash
   git clone <url-do-repositorio>
   ```

2. **Abrir o projeto da API**

   * No **Visual Studio** ou **VS Code**, abra a pasta:

     ```text
     RecantoImperial.Api
     ```

3. **Restaurar dependências**

   ```bash
   dotnet restore
   ```

4. **Executar a aplicação**

   ```bash
   dotnet run
   ```

5. A API irá subir em HTTP (porta definida pelo seu ambiente).
   No desenvolvimento padrão do Kestrel, você poderá acessar:

   * **Swagger UI:**
     👉 `http://localhost:5000/swagger`
     (ou a porta que o `dotnet run` indicar no console)

---

## 🗄️ Banco de Dados

* Banco de desenvolvimento: **SQLite**
* Arquivo criado automaticamente na raiz do projeto API:

  ```text
  recanto.db
  ```

Na inicialização, a API:

* Usa `EnsureCreated()` para criar o banco e as tabelas, se ainda não existirem
* Faz um **seed inicial** com duas aves de demonstração:

  * `A001` – Matriz 01
  * `A002` – Galo 01

Isso permite testar os endpoints assim que a aplicação sobe, sem precisar cadastrar nada manualmente.

---

## (Opcional) 📦 Uso de Migrations com EF Core

> ⚠️ **Não é obrigatório para rodar a versão atual**, pois o SQLite é criado automaticamente com `EnsureCreated()`.
> Estes comandos servem como referência para uma futura evolução do projeto (ex.: uso de MySQL).

Na pasta da API:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 🔗 Endpoints principais (visão geral)

Todos os endpoints estão documentados e testáveis via **Swagger** (`/swagger`).

### 🐔 Aves (`/api/Aves`)

* `GET /api/Aves`
  Lista todas as aves cadastradas.

* `GET /api/Aves/{id}`
  Busca uma ave pelo **Id**.

* `GET /api/Aves/by-anilha/{anilha}`
  Busca uma ave pela **anilha**.

* `POST /api/Aves`
  Cadastra uma nova ave.

* `PUT /api/Aves/{id}`
  Atualiza os dados de uma ave existente.

* `DELETE /api/Aves/{id}`
  Remove uma ave (soft delete lógico, conforme regra de negócio da API).

---

### 🧬 Cruzamentos (`/api/Cruzamentos`)

* `GET /api/Cruzamentos`
  Lista todos os cruzamentos com suas aves relacionadas (pai, mãe, filhos).

* `GET /api/Cruzamentos/{id}`
  Detalha um cruzamento específico.

* `POST /api/Cruzamentos`
  Registra um novo cruzamento, exigindo:

  * 1 **Pai**
  * 1 **Mãe**
  * Pelo menos 1 **Filho**

* `DELETE /api/Cruzamentos/{id}`
  Remove um cruzamento.

---

### 📅 Eventos (`/api/Eventos`)

* `GET /api/Eventos`
  Lista todos os eventos registrados.

* `GET /api/Eventos/{id}`
  Detalha um evento específico.

* `POST /api/Eventos`
  Registra um evento (ex.: venda, óbito, movimentação).

* `DELETE /api/Eventos/{id}`
  Remove um evento.

---

### 🌳 Genealogia (`/api/Genealogia`)

* `GET /api/Genealogia/por-ave/{id}`
  Monta a árvore genealógica (pai / mãe / avós) a partir do **Id da ave**.

* `GET /api/Genealogia/por-anilha/{anilha}`
  Monta a árvore genealógica a partir da **anilha**.

---

### 📄 Relatórios (`/api/Relatorios`)

* `POST /api/Relatorios/ficha-ave/{aveId}`
  Gera um **PDF de ficha da ave**, contendo os principais dados do animal.

  **Retorno exemplo:**

  ```json
  {
    "caminho": "C:\\...\\relatorios\\Ficha_Ave_A001_20251211194803.pdf",
    "id": 3
  }
  ```

* Os PDFs são gravados por padrão na pasta:

  ```text
  bin/Debug/net8.0/relatorios/
  ```

---

## 🧱 Estrutura básica do projeto

Dentro de `RecantoImperial.Api`:

* `Controllers/` – Endpoints da API (Aves, Cruzamentos, Eventos, Genealogia, Relatorios)
* `Services/` – Regras de negócio e acesso às entidades (IAveService, ICruzamentoService etc.)
* `Data/AppDbContext.cs` – Configuração do Entity Framework e mapeamento das tabelas
* `Models/` – Entidades de domínio (Ave, Cruzamento, Evento, Relatorio, etc.)
* `Dtos/` – Objetos de transferência de dados usados nos endpoints
* `Validators/` – Validações com FluentValidation
* `Mappings/` – Perfis do AutoMapper
* `Program.cs` – Configuração da aplicação, DI, Swagger, SQLite, seed inicial e pipeline HTTP

---

## 📚 Testando com Swagger

1. Rode a API:

   ```bash
   dotnet run
   ```

2. Acesse no navegador:

   ```text
   http://localhost:5000/swagger
   ```

3. Expanda cada seção:

   * **Aves**
   * **Cruzamentos**
   * **Eventos**
   * **Genealogia**
   * **Relatorios**

4. Use o botão **“Try it out”** em cada endpoint para:

   * Listar registros
   * Criar novas aves, cruzamentos e eventos
   * Visualizar a árvore genealógica
   * Gerar PDFs de ficha da ave

---

## 📝 Observações finais

* O projeto foi estruturado para ser **fácil de rodar em ambiente local** (basta ter .NET 8 instalado).
* O uso de **SQLite + EnsureCreated** evita dependências externas, facilitando testes e demonstrações.
* A API está preparada para evoluir para outros bancos (como MySQL) e para ser consumida por diferentes interfaces (Web, Desktop, Mobile).

> Para dúvidas ou evolução do projeto, consulte os comentários no código (especialmente em `Program.cs`) e as seções de serviços e modelos.

```
::contentReference[oaicite:0]{index=0}
```
