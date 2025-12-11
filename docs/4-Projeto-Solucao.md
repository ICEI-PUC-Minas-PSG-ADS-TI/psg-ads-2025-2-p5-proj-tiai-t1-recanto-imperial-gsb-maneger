## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

---
**ARQUITETURA DO SOFTWARE**
## 4.1. Arquitetura da Solução

## Estrutura da Arquitetura

**1. Interface do Usuário (Front-end):**
- Desenvolvida em **.NET (Windows Forms/WPF)**.
- Responsável pela interação direta com o usuário.
- Exibe dashboards, formulários de cadastro de aves, cruzamentos, relatórios e eventos do plantel.
- Interface projetada para uso offline, com foco em simplicidade e desempenho.

**2. Lógica de Negócio (Back-end / Camada de Aplicação):**
- Implementa as regras de negócio do criatório:
  - Cálculo de pontuação genética das aves (baseado na cartilha oficial GSB);
  - Controle de cruzamentos e geração de descendência;
  - Alteração automática de status (ativo, vendido, falecido);
  - Geração de relatórios e exportação em PDF;
  - Backup e restauração do banco de dados.
- Essa camada faz a mediação entre a interface e o banco de dados, garantindo consistência e integridade das operações.

**3. Banco de Dados (Camada de Dados):**
- Utiliza **SQLite**, um banco de dados leve e embarcado.
- Armazena todas as informações localmente (aves, cruzamentos, eventos e relatórios).
- Implementa chaves primárias, estrangeiras e campos gerados automaticamente para manter integridade referencial e cálculo automático da classificação de registro.

## Tecnologias Utilizadas

| Componente              | Tecnologia / Ferramenta                 | Função Principal                                                  |
|--------------------------|----------------------------------------|-------------------------------------------------------------------|
| **Frontend (Interface)** | HTML5, CSS3, JavaScript                | Criação das telas, interação com o usuário e controle visual      |
| **Linguagem principal**  | C# (.NET Framework / .NET 8)           | Lógica de negócio, controle de dados e integração com o SQLite    |
| **Banco de dados local** | SQLite                                 | Armazenamento leve e persistente de aves, cruzamentos e eventos   |
| **Interface gráfica**    | HTML + CSS + JS (frontend web local)   | Interface moderna e acessível para o usuário                     |
| **Geração de relatórios**| .NET (C#) com iTextSharp **ou** JavaScript (PDF.js / jsPDF) | Exportação de dados e relatórios em PDF                          |
| **Backup e restauração** | JavaScript (File System API) **+** .NET | Manipulação e salvamento de backups locais de forma integrada     |
| **Versionamento**        | GitHub                                 | Controle de versões, colaboração e documentação do projeto        |


**Diagrama:**

<img width="1920" height="1080" alt="Design sem nome (2)" src="https://github.com/user-attachments/assets/b3643c63-fd0d-4b56-baa9-91e6f1b69994" />

 
---
**MODELAGEM VISUAL DAS TELAS**

## 4.2. Wireframe / Mockup

**Wireframe 1 — Tela Principal**  
<img width="1366" height="768" alt="HOME" src="https://github.com/user-attachments/assets/f92c7fc0-eb07-4b39-a525-0e0b31d82bac" />

**Wireframe 2 — Cadastro de Ave**  
<img width="1366" height="768" alt="Cadastrar Ave" src="https://github.com/user-attachments/assets/87b13201-603a-44fc-87bd-f844c4304882" />

**Wireframe 2 — Registrar Cruzamento** 
<img width="1366" height="768" alt="Registrar Cruzamento" src="https://github.com/user-attachments/assets/87278ca0-dc65-46ad-80e2-4fa985940509" />

**Wireframe 2 — Eventos do Plantel** 
<img width="1366" height="768" alt="Eventos do Plantel" src="https://github.com/user-attachments/assets/81b91903-631f-4ee5-84f1-0f50767083fd" />

**Wireframe 2 — Relatório e Exportaçãn** 
<img width="1366" height="768" alt="Relatório e Exportação" src="https://github.com/user-attachments/assets/b1cc3894-a56f-4917-93a9-7eac13ee405d" />
<img width="1366" height="768" alt="Relatório e Exportação 2" src="https://github.com/user-attachments/assets/f4167901-f713-4ca1-b40a-ec33b9eacbd7" />
<img width="1366" height="768" alt="Relatório e Exportação 3" src="https://github.com/user-attachments/assets/4d52232b-60c4-4f66-a843-c193fe840d68" />

**Wireframe 2 — Backup e Restauração** 
<img width="1366" height="768" alt="Backup e Restauração" src="https://github.com/user-attachments/assets/877dd635-3005-419f-959d-0fbd05c5976e" />

---
**UML**

## 4.3 Diagrama de Classes
<img width="1366" height="768" alt="Diagrama de Classes" src="https://github.com/user-attachments/assets/02a90138-fe15-4b13-aacb-e720662b9b25" />



**BANCO DE DADOS**
## 4.4. Modelo de Dados
<img width="1366" height="768" alt="Modelo de Dados" src="https://github.com/user-attachments/assets/d0140996-2069-4017-b349-bea0a202c761" />



### 4.4.1 Diagrama Entidade-Relacionamento (DER)

O **Diagrama Entidade-Relacionamento (DER)** descreve as entidades, atributos e relacionamentos do sistema.  
Utilize a ferramenta **[BR Modelo Web](https://www.brmodeloweb.com/lang/pt-br/index.html)** para criar o diagrama.

**Orientações:**
- Todas as entidades devem possuir chave primária.
- Relacionamentos devem estar corretamente cardinalizados.
- O diagrama deve contemplar todas as funcionalidades levantadas nos processos de negócio.

**Exemplo de imagem:**

![Diagrama ER - Exemplo](./images/DER.png)

📌 **Entrega:** gere o diagrama no BR Modelo, exporte em **.png** e inclua-o nesta seção.

![Diagrama ER](https://github.com/user-attachments/assets/901bdbc2-93b2-4479-8ee5-2435eb60187d)

---

### 4.4.2 Esquema Relacional

O **Esquema Relacional** converte o Modelo ER para tabelas relacionais, incluindo chaves primárias, estrangeiras e restrições de integridade.  
Utilize o **[MySQL Workbench](https://www.mysql.com/products/workbench/)** para gerar o diagrama de tabelas (Modelo Lógico).

**Orientações:**
- Inclua todos os atributos das entidades.
- Defina tipos de dados adequados para cada campo.
- Configure as restrições de integridade (NOT NULL, UNIQUE, FOREIGN KEY, etc.).

📌 **Entrega:** exporte o diagrama do Workbench e adicione a imagem aqui.
![02](https://github.com/user-attachments/assets/5ee519a7-9bcb-44f9-bf2f-d4922dbcd14b)


**Exemplo de imagem:**

![Esquema Relacional - Exemplo](./images/TabelasBD.png)

---

### 4.4.3 Modelo Físico

O modelo físico foi desenvolvido com base no DER do sistema de gerenciamento de aves, relatórios e cruzamentos. O objetivo é garantir persistência de dados confiável, integridade referencial e rastreamento das operações realizadas no criatório.

```sql

CREATE TABLE Relatorios (
    idRelatorio INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    dataGeracao DATE NOT NULL
);

CREATE TABLE Backups (
    idBackup INT AUTO_INCREMENT PRIMARY KEY,
    caminho VARCHAR(255) NOT NULL,
    data DATE NOT NULL
);

CREATE TABLE Aves (
    idAve INT AUTO_INCREMENT PRIMARY KEY,
    anilha VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(100) NULL,
    linhagem VARCHAR(100),
    sexo ENUM('Macho','Fêmea') DEFAULT 'Fêmea',
    dataNascimento DATE NULL,
    idade INT,
    peso DECIMAL(5,2) NULL,
    status VARCHAR(50),

    cor_bico VARCHAR(50) NULL,
    canelas VARCHAR(50) NULL,
    plumagem_pattern VARCHAR(50) NULL,
    caracteristicas TEXT NULL,

    auricula_despig_percent TINYINT UNSIGNED DEFAULT 0,
    crista_tombamento ENUM('Nenhuma','TercoDistal','DoisTerços','Outro') DEFAULT 'Nenhuma',
    barbela_desigualdade_percent DECIMAL(5,2) DEFAULT 0,

    plumagem_barrada TINYINT(1) DEFAULT 0,
    plumagem_frisada TINYINT(1) DEFAULT 0,
    plumagem_carijo TINYINT(1) DEFAULT 0,
    pescoco_pelado TINYINT(1) DEFAULT 0,
    barbuda TINYINT(1) DEFAULT 0,
    olhos_vermelhos TINYINT(1) DEFAULT 0,

    auricula_points TINYINT GENERATED ALWAYS AS (
        CASE
            WHEN auricula_despig_percent BETWEEN 30 AND 50 THEN 1
            WHEN auricula_despig_percent > 50 THEN 2
            ELSE 0
        END
    ) STORED,

    crista_points TINYINT GENERATED ALWAYS AS (
        CASE
            WHEN crista_tombamento = 'TercoDistal' THEN 1
            WHEN crista_tombamento = 'DoisTerços' THEN 2
            ELSE 0
        END
    ) STORED,

    barbela_points TINYINT GENERATED ALWAYS AS (
        CASE
            WHEN barbela_desigualdade_percent > 5 THEN 2
            WHEN barbela_desigualdade_percent > 0 THEN 1
            ELSE 0
        END
    ) STORED,

    pontos_totais INT GENERATED ALWAYS AS (
        auricula_points + crista_points + barbela_points
    ) STORED,

    registro_resultado ENUM('Registrado','Pendente','Não Registrado')
        GENERATED ALWAYS AS (
            CASE
                WHEN (plumagem_barrada = 1 OR plumagem_frisada = 1 OR plumagem_carijo = 1
                      OR pescoco_pelado = 1 OR barbuda = 1 OR olhos_vermelhos = 1) THEN 'Não Registrado'
                WHEN (auricula_points + crista_points + barbela_points) >= 2 THEN 'Não Registrado'
                WHEN (auricula_points + crista_points + barbela_points) = 1 THEN 'Pendente'
                ELSE 'Registrado'
            END
        ) STORED,

    registro_observacoes TEXT NULL
);

CREATE INDEX idx_aves_registro_resultado ON Aves (registro_resultado);


CREATE TABLE Eventos (
    idEventos INT AUTO_INCREMENT PRIMARY KEY,
    idAve INT NOT NULL,
    tipoEvento VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (idAve) REFERENCES Aves(idAve)
);

CREATE TABLE Cruzamento (
    idCruzamento INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL
);

CREATE TABLE Cruzamento_Aves (
    idCruzamento INT NOT NULL,
    idAve INT NOT NULL,
    papel VARCHAR(50),
    PRIMARY KEY (idCruzamento, idAve),
    FOREIGN KEY (idCruzamento) REFERENCES Cruzamento(idCruzamento),
    FOREIGN KEY (idAve) REFERENCES Aves(idAve)
);

```
## 📌ATENÇÃO: salvar como banco.sql na pasta src/bd

---
### 4.4.4 Banco de Dados NoSQL (Opcional)

> **Atenção:** Preencha esta seção **somente se o seu projeto utilizar Banco de Dados NoSQL**.

Se o projeto adotar NoSQL, a entrega deve incluir:

#### 1. Modelo de Coleções / Documentos
- Descreva como os dados serão organizados em **coleções, documentos ou grafos**.  

#### 2. Exemplos de Documentos / Registros
- Mostre exemplos reais de dados para cada coleção ou entidade.  

```json
{
  "_id": "1",
  "nome": "Juliana",
  "email": "juliana@email.com",
  "perfil": "admin"
}
```
### 5 Documentação de Testes – RecantoImperial API (Swagger)

>
- **Projeto:** RecantoImperial.Api
- **Versão:** 1.0
- **Ambiente de teste:** `http://localhost:5000/swagger`
- **Ferramenta:** Swagger UI – `/swagger/index.html`
- **Data dos testes:** 11/12/2025

Foram executados testes em **todos os endpoints** expostos no Swagger da API, cobrindo operações de consulta, cadastro, atualização, exclusão, genealogia e geração de relatórios PDF.


<img width="1919" height="1037" alt="0" src="https://github.com/user-attachments/assets/97387610-d569-4cf1-8440-521fa2f9ccf0" />

---

## 1. Aves (`/api/Aves`)

### 1.1. Listar todas as aves

**Endpoint:** `GET /api/Aves`

**Objetivo:** Retornar a lista completa de aves cadastradas.

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Lista de aves com os registros:
    - `id: 1` – Anilha `A001`, Nome `Matriz 01`, Sexo `Femea`, Status `Ativa`
    - `id: 2` – Anilha `A002`, Nome `Galo 01`, Sexo `Macho`, Status `Ativa`
    - `id: 3` – Anilha `GSB001`, Nome `Turmalina SUPER Atualizada`, com `dataNascimento` e `peso`
    - `id: 6` – Anilha `A003`, Nome `Matriz Rubi`
    - `id: 7` – Anilha `A004`, Nome `Galo Onix`

**Imagem do teste:**

<img width="1057" height="1338" alt="1" src="https://github.com/user-attachments/assets/a048120e-e0fc-430c-9677-c0f36e37c3f9" />


---

### 1.2. Criar ave

**Endpoint:** `POST /api/Aves`

**Objetivo:** Cadastrar uma nova ave.

**Body utilizado no teste:**

```json
{
  "anilha": "A004",
  "nome": "Galo Onix",
  "linhagem": "Linha Onix",
  "sexo": "Macho",
  "dataNascimento": "2025-03-12",
  "peso": 2.80,
  "fotoPath": ""
}

```

**Resultado do teste (segundo envio com mesma anilha):**

- **Status:** `400 Bad Request`
- **Retorno:**

```json
{
  "error": "Anilha 'A004' já cadastrada."
}

```

**Conclusão:**

- Validação de unicidade da **anilha** funcionando corretamente (retorno 400 quando duplicada).

**Imagem do teste:**

<img width="1058" height="1551" alt="2" src="https://github.com/user-attachments/assets/a3780e99-bd51-4806-aab4-89c52e5e73c9" />


---

### 1.3. Buscar ave por ID

**Endpoint:** `GET /api/Aves/{id}`

**Exemplo testado:** `GET /api/Aves/1`

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Registro da ave `A001 – Matriz 01`, com status `Ativa`.

**Imagem do teste:**

<img width="1047" height="1226" alt="3" src="https://github.com/user-attachments/assets/b77b2dcc-007c-486f-8b73-203e63ce0deb" />

---

### 1.4. Atualizar ave

**Endpoint:** `PUT /api/Aves/{id}`

**Exemplo testado:** `PUT /api/Aves/3`

**Body utilizado:**

```json
{
  "id": 3,
  "anilha": "GSB001",
  "nome": "Turmalina SUPER Atualizada",
  "linhagem": "Galo Esmeralda",
  "sexo": "Femea",
  "dataNascimento": "2025-01-10",
  "peso": 2.60,
  "fotoPath": "",
  "statusDescricao": "Ativa"
}

```

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Objeto atualizado com os mesmos dados enviados.

**Imagem do teste:**

<img width="1045" height="1639" alt="4" src="https://github.com/user-attachments/assets/be76ca12-0743-4eb0-8e69-c0d939aa2bbd" />


---

### 1.5. Deletar ave

**Endpoint:** `DELETE /api/Aves/{id}`

**Exemplo testado:** `DELETE /api/Aves/7`

**Resultado do teste:**

- **Status:** `204 No Content`
- Nenhum corpo de resposta, indicando exclusão bem-sucedida.

**Imagem do teste:**

<img width="1057" height="1060" alt="5" src="https://github.com/user-attachments/assets/a4088bbb-c212-498c-b99f-82573c76c1bb" />


---

### 1.6. Buscar ave por anilha

**Endpoint:** `GET /api/Aves/by-anilha/{anilha}`

**Exemplo testado:** `GET /api/Aves/by-anilha/A001`

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Dados da ave com anilha `A001`.

**Imagem do teste:**

<img width="1052" height="1237" alt="6" src="https://github.com/user-attachments/assets/766439bf-bdc2-40b1-b2fd-c56abbe396e2" />


---

## 2. Cruzamentos (`/api/Cruzamentos`)

### 2.1. Listar cruzamentos

**Endpoint:** `GET /api/Cruzamentos`

**Objetivo:** Listar todos os cruzamentos com seus respectivos Pai, Mãe e Filhos.

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Lista contendo, por exemplo:
    - Cruzamento `id: 2` – “Cruzamento de teste Turmalina”
    - Cruzamento `id: 3` – “Cruzamento Turmalina - árvore de teste”
- Cada cruzamento retorna:
    - `data`
    - `observacoes`
    - Coleção `cruzamentoAves` com:
        - Ave com `papel: "Pai"`
        - Ave com `papel: "Mae"`
        - Ave(s) com `papel: "Filho"`

**Imagem do teste:**

<img width="1044" height="1475" alt="7" src="https://github.com/user-attachments/assets/001f3ed9-4ff5-4375-8dba-f38c986b382d" />


---

### 2.2. Criar cruzamento

**Endpoint:** `POST /api/Cruzamentos`

**Body utilizado:**

```json
{
  "observacoes": "Cruzamento Turmalina - árvore de teste",
  "aves": [
    {
      "aveId": 2,
      "papel": "Pai"
    },
    {
      "aveId": 1,
      "papel": "Mae"
    },
    {
      "aveId": 3,
      "papel": "Filho"
    }
  ]
}

```

**Resultado do teste:**

- **Status:** `201 Created`
- **Retorno:** Cruzamento criado com:
    - `id: 3`
    - `data`: preenchida automaticamente (UTC)
    - `observacoes`: conforme enviado
    - `cruzamentoAves`: contendo Pai, Mãe e Filho com as aves ligadas corretamente

**Imagem do teste:**

<img width="1040" height="1783" alt="8" src="https://github.com/user-attachments/assets/fddbedd7-a5b2-4dcf-a370-b66764a6dd21" />


---

### 2.3. Buscar cruzamento por ID

**Endpoint:** `GET /api/Cruzamentos/{id}`

**Exemplo testado:** `GET /api/Cruzamentos/2`

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Dados completos do cruzamento `id: 2` com suas aves relacionadas.

**Imagem do teste:**

<img width="1040" height="1555" alt="9" src="https://github.com/user-attachments/assets/27374e2c-c3b4-4c1f-b9a9-1e6281ff9405" />


---

### 2.4. Deletar cruzamento

**Endpoint:** `DELETE /api/Cruzamentos/{id}`

**Exemplo testado:** `DELETE /api/Cruzamentos/3`

**Resultado do teste:**

- **Status:** `204 No Content`
- Cruzamento removido com sucesso.

**Imagem do teste:**

<img width="1045" height="816" alt="10" src="https://github.com/user-attachments/assets/b179d1ca-6082-4fe4-8a8e-a81140f59c34" />


---

## 3. Eventos (`/api/Eventos`)

### 3.1. Listar eventos

**Endpoint:** `GET /api/Eventos`

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Lista de eventos, por exemplo:
    - `id: 2` – Evento de **Venda** da ave `A001`
    - `id: 3` – Outro registro de **Venda** da mesma ave

**Imagem do teste:**


<img width="1041" height="1087" alt="11" src="https://github.com/user-attachments/assets/95859d1d-8ff2-44f9-9015-bcd346b978a0" />

---

### 3.2. Criar evento

**Endpoint:** `POST /api/Eventos`

**Body utilizado:**

```json
{
  "aveId": 1,
  "tipoEvento": "Venda",
  "observacoes": "Ave vendida para cliente X",
  "data": "2025-10-12"
}

```

**Resultado do teste:**

- **Status:** `201 Created`
- **Retorno:** Evento criado com `id: 3`, associando ao registro da ave `A001`.

**Imagem do teste:**
<img width="1046" height="1363" alt="12" src="https://github.com/user-attachments/assets/acc98ff5-000e-4a10-9d8a-6c6b620bb920" />

---

### 3.3. Deletar evento

**Endpoint:** `DELETE /api/Eventos/{id}`

**Exemplo testado:** `DELETE /api/Eventos/2`

**Resultado do teste:**

- **Status:** `204 No Content`

**Imagem do teste:**

<img width="1036" height="816" alt="13" src="https://github.com/user-attachments/assets/0395cb9f-0c74-4b5e-8a77-33b075a2e550" />


---

### 3.4. Buscar evento por ID (após exclusão)

**Endpoint:** `GET /api/Eventos/{id}`

**Exemplo testado:** `GET /api/Eventos/2` (após o DELETE)

**Resultado do teste:**

- **Status:** `404 Not Found`
- **Retorno:** Objeto padrão de problema HTTP, indicando recurso não encontrado.

**Imagem do teste:**

<img width="1041" height="958" alt="14" src="https://github.com/user-attachments/assets/8324ac2a-513d-469b-bef9-b93d858c5eeb" />


---

## 4. Genealogia (`/api/Genealogia`)

### 4.1. Genealogia por ID da ave

**Endpoint:** `GET /api/Genealogia/por-ave/{id}`

**Exemplo testado:** `GET /api/Genealogia/por-ave/3`

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Estrutura de genealogia:
    - `raiz`: Ave `GSB001 – Turmalina SUPER Atualizada`
    - `pai`: Ave `A002 – Galo 01`
    - `mae`: Ave `A001 – Matriz 01`
    - Avós paternos e maternos (`avoPaterno`, `avaPaterna`, `avoMaterno`, `avaMaterna`) retornando `null` (não cadastrados).

**Imagem do teste:**
<img width="1040" height="1056" alt="15" src="https://github.com/user-attachments/assets/2acd1217-f9eb-46df-8071-f952b83aad66" />

---

### 4.2. Genealogia por anilha

**Endpoint:** `GET /api/Genealogia/por-anilha/{anilha}`

**Exemplo testado:** `GET /api/Genealogia/por-anilha/GSB001`

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Mesmo resultado de genealogia do teste por id, agora usando a anilha.

**Imagem do teste:**
<img width="1034" height="1054" alt="16" src="https://github.com/user-attachments/assets/458d019f-9535-47ba-9382-2f1878e45f54" />

---

## 5. Relatórios (`/api/Relatorios`)

### 5.1. Gerar ficha da ave (PDF)

**Endpoint:** `POST /api/Relatorios/ficha-ave/{aveId}`

**Exemplo testado:** `POST /api/Relatorios/ficha-ave/1`

**Parâmetros:**

- `aveId` (path): `1`
- `destinoPasta` (query): **não informado** (deixa usar o padrão da aplicação)

**Resultado do teste:**

- **Status:** `200 OK`
- **Retorno:** Objeto contendo:
    - `caminho`: Caminho completo do PDF gerado, ex:
        - `C:\Users\messias.silva\Desktop\RecantoImperial.Api\bin\Debug\net8.0\relatorios\Ficha_Ave_A001_20251211194803.pdf`
    - `id`: identificador do registro de relatório (ex: `3`).

**Imagem do teste:**

<img width="1040" height="855" alt="17" src="https://github.com/user-attachments/assets/284a48a7-6892-410b-b08d-5f2904447a4b" />


---

## 6. Conclusão dos Testes

- Todos os endpoints documentados em Swagger foram exercitados:
    - CRUD de **Aves**
    - CRUD de **Cruzamentos**
    - CRUD de **Eventos**
    - Consultas de **Genealogia** por `id` e `anilha`
    - Geração de **Relatório PDF de ficha de ave**
- As regras principais foram validadas:
    - **Anilha única** ao cadastrar aves.
    - Cruzamento com Pai, Mãe e pelo menos um Filho.
    - Respostas `404` após remoção de recursos.
    - Geração correta de PDF e caminho retornado no corpo.

As imagens do Swagger anexadas a este documento ilustram cada uma das chamadas descritas acima, servindo como evidência visual do funcionamento da API na versão atual.

---
