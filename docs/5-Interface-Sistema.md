# 5. Interface do Sistema

<span style="color:red">Pré-requisitos: <a href="4-Gestão-Configuração.md"> Planejamento do Projeto</a></span>



## 5.1 Tecnologias Utilizadas

> Liste todas as tecnologias utilizadas no projeto, com justificativas breves para cada escolha.  
> Este quadro deve ser atualizado sempre que novas ferramentas forem adicionadas ou substituídas.

| Categoria                     | Tecnologia/Ferramenta           | Justificativa de uso |
|-------------------------------|----------------------------------|----------------------|
| Linguagem back-end            | C# (.NET 8)                      | Implementação da API REST do sistema. |
| Framework back-end            | ASP.NET Core Web API             | Criação de serviços HTTP organizados em controllers. |
| ORM                           | Entity Framework Core            | Mapeamento objeto–relacional e acesso ao banco de dados. |
| Banco de Dados (dev)          | SQLite                           | Banco embarcado para desenvolvimento local e testes rápidos. |
| Banco de Dados (produção)     | MySQL (planejado)                | Banco relacional para ambiente final do criatório. |
| Mapeamento de objetos         | AutoMapper                       | Conversão entre entidades de domínio e DTOs de API. |
| Validações                    | FluentValidation                 | Validação das requisições (DTOs) antes de persistir dados. |
| Geração de relatórios         | QuestPDF                         | Criação da ficha da ave em formato PDF. |
| Documentação e testes da API  | Swagger / Swashbuckle            | Documentação interativa e testes dos endpoints. |
| Framework ORM de migração     | EF Core Migrations (MySQL futuro)| Controle de evolução do schema do banco na integração futura com MySQL. |
| IDE                           | Visual Studio 2022 / VS Code     | Ambientes principais de desenvolvimento e depuração. |
| Controle de versão            | Git + GitHub                     | Versionamento do código-fonte e colaboração. |

---

## 5.2 Acompanhamento das Interfaces do Sistema

> Esta seção deve funcionar como **registro contínuo do progresso** do projeto.  
> Inclua sempre **descrição**, **status**, **data de atualização** e **imagem real** da tela.

No escopo desta entrega, a interface utilizada para interação com o back-end é o **Swagger UI**, que expõe e permite testar todos os endpoints da API (Aves, Cruzamentos, Eventos, Genealogia e Relatórios).

### 📋 Quadro de Progresso das Telas

| Requisito/Tela                                      | Status           | Última atualização | Próxima entrega                    |
|-----------------------------------------------------|------------------|--------------------|------------------------------------|
| Tela Swagger – Aves (CRUD + busca por anilha)       | 🟢 Concluída     | 11/12/2025         | -                                  |
| Tela Swagger – Cruzamentos (CRUD)                   | 🟢 Concluída     | 11/12/2025         | -                                  |
| Tela Swagger – Eventos (CRUD)                       | 🟢 Concluída     | 11/12/2025         | -                                  |
| Tela Swagger – Genealogia (por ID e por anilha)     | 🟢 Concluída     | 11/12/2025         | -                                  |
| Tela Swagger – Relatórios (Ficha da Ave em PDF)     | 🟢 Concluída     | 11/12/2025         | -                                  |
| Interface gráfica própria (frontend web do sistema) | 🟢 Concluíd      | 11/12/2025         | -                                  |

Legenda: 🟢 Concluído | 🟡 Em andamento | 🔴 Não iniciado

---

## 5.3 Registro Visual das Telas

> As imagens devem ser salvas no diretório `images/` do projeto/documentação  
> e referenciadas nos links abaixo.

#### 5.3.1 Tela Swagger – Aves
**Descrição:**  
Interface do Swagger que concentra todos os endpoints relacionados às aves, permitindo:
- Listar todas as aves (`GET /api/Aves`);
- Buscar por ID (`GET /api/Aves/{id}`);
- Buscar por anilha (`GET /api/Aves/by-anilha/{anilha}`);
- Criar nova ave (`POST /api/Aves`);
- Atualizar dados da ave (`PUT /api/Aves/{id}`);
- Excluir ave (`DELETE /api/Aves/{id}`).
<img width="1445" height="598" alt="Captura de tela 2025-12-11 170920" src="https://github.com/user-attachments/assets/353233d7-8fa1-4917-8efc-d8e094a69319" />

---

#### 5.3.2 Tela Swagger – Cruzamentos e Eventos
**Descrição:**  
Tela do Swagger com os grupos de endpoints de **Cruzamentos** e **Eventos**, utilizada para:
- Registrar cruzamentos entre aves (Pai, Mãe e Filhos) (`POST /api/Cruzamentos`);
- Listar e consultar cruzamentos por ID (`GET /api/Cruzamentos`, `GET /api/Cruzamentos/{id}`);
- Excluir cruzamentos (`DELETE /api/Cruzamentos/{id}`);
- Registrar eventos de manejo, venda, etc. (`POST /api/Eventos`);
- Listar e consultar eventos por ID (`GET /api/Eventos`, `GET /api/Eventos/{id}`);
- Excluir eventos (`DELETE /api/Eventos/{id}`).
<img width="1455" height="548" alt="Captura de tela 2025-12-11 170944" src="https://github.com/user-attachments/assets/63a50ba7-6f00-4bb2-9d61-806c35eda6a8" />


---

#### 5.3.3 Tela Swagger – Genealogia e Relatórios
**Descrição:**  
Tela do Swagger que apresenta:
- Endpoints de **Genealogia** para montar a árvore da ave:
  - `GET /api/Genealogia/por-ave/{id}`
  - `GET /api/Genealogia/por-anilha/{anilha}`  
  Retornando pai, mãe e (quando disponíveis) avós.
- Endpoint de **Relatórios**:
  - `POST /api/Relatorios/ficha-ave/{aveId}`  
  Responsável por gerar a ficha da ave em PDF em disco e retornar o caminho do arquivo.
<img width="1438" height="276" alt="Captura de tela 2025-12-11 171001" src="https://github.com/user-attachments/assets/5dee0a04-4094-442f-8669-09499fc1b0fd" />


5.3.4 Tela Cadastrar Ave
<img width="1837" height="865" alt="Captura de tela 2025-12-11 175308" src="https://github.com/user-attachments/assets/740cd620-0aec-49e9-af31-b93a3d0df1fd" />

5.3.5 Tela Registrar Cruzamento
<img width="1844" height="869" alt="Captura de tela 2025-12-11 175337" src="https://github.com/user-attachments/assets/83035c9f-e2b4-4ddd-a6f8-6cc5729cfbd5" />

5.3.6 Tela Eventos do Plantel
<img width="1862" height="877" alt="Captura de tela 2025-12-11 175402" src="https://github.com/user-attachments/assets/12b476ac-edfd-45e1-a4ca-9cff9f6ccf3a" />

5.3.7 Tela Relatórios e Exportação
<img width="1834" height="871" alt="Captura de tela 2025-12-11 175416" src="https://github.com/user-attachments/assets/875ae14e-12fd-4ef0-b95f-2f8111fd7605" />
<img width="1837" height="872" alt="Captura de tela 2025-12-11 175427" src="https://github.com/user-attachments/assets/7355c822-1d93-4611-8b7b-cb3553a36de9" />

5.3.8 Tela Backup e Restauração
<img width="1857" height="877" alt="Captura de tela 2025-12-11 175442" src="https://github.com/user-attachments/assets/2d3f7ed3-7312-4645-9886-27a3a226aa1e" />


---

> **📢 AVISO IMPORTANTE – ATUALIZAÇÃO DE PROGRESSO**  
> *(leia com atenção antes de finalizar a sprint)*  
>
> 1. **Ao final de cada sprint**, atualizar o quadro de progresso com:  
>    - Status da tela (🟢, 🟡 ou 🔴)  
>    - Data da última modificação  
>    - Próxima previsão de entrega  
> 2. Adicionar **imagens reais** das telas desenvolvidas no diretório `images/`.  
> 3. Descrever brevemente as funcionalidades implementadas ou mudanças feitas desde a última atualização.  
>
> 📌 **Objetivo**: Permitir que o professor visualize rapidamente **o que já foi entregue, o que está em andamento e o que ainda falta desenvolver**, garantindo acompanhamento eficaz do projeto.
