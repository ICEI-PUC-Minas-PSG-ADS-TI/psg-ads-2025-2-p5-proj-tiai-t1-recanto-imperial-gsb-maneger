# 2. Planejamento do Projeto

Esta seção apresenta como o grupo organizou o trabalho ao longo do semestre, com as tarefas distribuídas por Sprints. O objetivo é facilitar o acompanhamento do progresso, a rastreabilidade das entregas e a colaboração entre os membros.

---

## 2.1 Sprints do Projeto 

O projeto será realizado em **4 sprints**, cada uma com foco específico:

| Sprint         | Objetivo                                                                                 | Produtos Esperados                               |
|----------------|------------------------------------------------------------------------------------------|--------------------------------------------------|
| **Sprint 1**   | Entrevista com a empresa e contextualização do problema                                | Preenchimento da introdução e contextualização no `README.md` |
| **Sprint 2**   | Levantamento de requisitos e criação de protótipos                                     | Quadro de requisitos (funcionais e não funcionais), personas e wireframes |
| **Sprint 3**   | Desenvolvimento da ferramenta e preparação para apresentação parcial                    | Primeira versão funcional do sistema + Apresentação Parcial |
| **Sprint 4**   | Finalização do sistema, testes, apresentação final e relatório no sistema APC           | Versão final do sistema + Apresentação Final + Relatório Individual no APC dentro do SGA |

---

## Organização da Equipe por Sprint

Durante o projeto, um integrante será escolhido como **Líder do Grupo** em cada sprint. Os demais membros assumirão papéis técnicos de acordo com suas competências:

- **Messias Junio** – Documentação técnica, análise de requisitos e integração do sistema.  
- **Luis Henrique Nicodemos** – Desenvolvimento back-end e modelagem de banco de dados.  
- **Gabriel Marinho** – Desenvolvimento front-end, experiência do usuário (UX/UI) e testes.  

Exemplo de papéis por sprint (pode ser revezado ou adaptado):

- **Sprint 1**: Líder – Messias; Front-end – Gabriel; Back-end – Luis.  
- **Sprint 2**: Líder – Luis; Front-end – Gabriel; Documentação – Messias.  
- **Sprint 3**: Líder – Gabriel; Front-end – Gabriel; Back-end – Luis; Apoio – Messias.  
- **Sprint 4**: Líder – Messias; QA/Testes – Gabriel; Back-end – Luis.  

---

## 2.2 Planejamento de Sprints – Projeto de Extensão Universitária

### 2.2.1 Quadro de Tarefas (Kanban do GitHub)

A divisão de tarefas e o acompanhamento da execução serão feitos utilizando o **Kanban do GitHub**, já disponível na aba **Projects** do repositório.  

O quadro está organizado em colunas que representam as etapas do fluxo de trabalho:

- **A Fazer**: tarefas pendentes de início.  
- **Desenvolver**: tarefas em andamento.  
- **Fila para Teste**: tarefas finalizadas no desenvolvimento e aguardando testes.  
- **Teste**: tarefas em validação.  
- **Feito**: tarefas concluídas.  

> **Importante:** A coluna *Implantar* não será utilizada neste trabalho, pois não faz parte do escopo do Projeto Extensão. Caso o grupo resolva implantar a solução futuramente, esse status poderá ser incorporado.

**Orientações práticas:**
1. Registrar todas as tarefas na coluna **A Fazer**.  
2. Movimentar os cartões conforme o andamento do trabalho.  
3. Manter atualizado o **responsável**, a **descrição** e o **prazo** em cada cartão.  
4. Ao final da sprint, arquivar o board para manter o histórico.  

**Exemplo de uso no GitHub Kanban:**  
- **A Fazer**: Criar página de login (Responsável: Gabriel, Prazo: 10/09).  
- **Desenvolver**: Modelar banco de dados (Responsável: Luis, Prazo: 15/09).  
- **Teste**: Validar autenticação de login (Responsável: Messias, Prazo: 20/09).  

---

### 2.2.1.1 Modelo de Sprint: 4 Kanbans no GitHub

Será criado um **board (Kanban) para cada sprint** no repositório, com as colunas padrão:

- **A Fazer** | **Desenvolver** | **Fila para Teste** | **Teste** | **Feito**

Cada cartão conterá:
- **Título curto da tarefa**  
- **Descrição com subtarefas** (se houver)  
- **Responsável**  
- **Label** (ex.: front, back, doc, teste)  
- **Data de início e prazo**

**Nomes sugeridos para os boards:**
- `Sprint 1 — Kanban`  
- `Sprint 2 — Kanban`  
- `Sprint 3 — Kanban`  
- `Sprint 4 — Kanban`  

---

## 2.2.2 Quadro de Tarefas (Kanban dentro deste documento)

Caso a equipe não utilize o GitHub Projects, este quadro servirá para informar a professora sobre o andamento das tarefas.  

**Legenda de Status:**
- ✔️ Concluído  
- 📝 Em andamento  
- ⌛ Atrasado  
- ❌ Não iniciado  

---

### 🟢 Sprint 1 – Entendimento do Problema e Proposta de Solução  

**Período estimado:** 29/07 a 16/08  
**Objetivo:** Entrevista com o cliente, identificação do problema, descrição do contexto e proposta de solução.  

| Responsável          | Função no Grupo   | Tarefa                                              | Início | Prazo | Status | Entrega       |
|-----------------------|-------------------|-----------------------------------------------------|--------|-------|--------|---------------|
| Messias Junio        | Líder/Documentação | Agendar e conduzir entrevista com o cliente         | 29/07  | 02/08 | ✔️      | Link/print    |
| Gabriel Marinho       | Front-end/Relator  | Descrever o contexto e problemas atuais             | 01/08  | 05/08 | ✔️      | contexto.md     |
| Luis Henrique Nicodemos | Back-end/Escritor técnico | Redigir proposta de sistema com base nos dados | 05/08  | 08/08 | ✔️      | contexto.md     |
| Todos                | Organização       | Revisar e validar conteúdo publicado                | 08/08  | 16/08 | ✔️      | GitHub Repo   |

---

### 🟡 Sprint 2 – Levantamento de Requisitos e Wireframes  

**Período estimado:** 19/08 a 06/09  
**Objetivo:** Levantar requisitos funcionais e não funcionais, criar wireframes e documentar histórias de usuário.  

| Responsável               | Função no Grupo | Tarefa                                               | Início  | Prazo  | Status | Entrega             |
|---------------------------|----------------|-----------------------------------------------------|---------|--------|--------|-------------------|
| Messias Junio             | Documentação   | Elaborar lista de requisitos e criar wireframes das principais telas | 19/08  | 23/08  | ✔️     | Documentação + Wireframes |
| Gabriel Marinho           | UX Designer    | Diagramas de classes e modelo de dados             | 20/08  | 27/08  | ✔️     | Diagramas de classe |
| Luis Henrique Nicodemos   | Back-end       | Documentar histórias de usuário                    | 22/08  | 29/08  | ✔️     | Modelagem Relacional e Logica (README.md) |
| Derick                    | Back-end       | Modelo físico do banco de dados                    | 22/08  | 29/08  | ✔️     | Modelo físico (diagramas/imagens) |
| Todos                     | Revisão coletiva | Validar com cliente requisitos e protótipos      | 30/08  | 06/09  | ✔️     | |
---

### 🔵 Sprint 3 – Desenvolvimento Inicial e Apresentação Parcial  

**Período estimado:** 09/09 a 30/09  
**Objetivo:** Iniciar desenvolvimento do sistema e apresentar progresso parcial.  

| Responsável          | Função no Grupo | Tarefa                                    | Início | Prazo | Status | Entrega   |
|-----------------------|-----------------|-------------------------------------------|--------|-------|--------|-----------|
| Gabriel Marinho       | Front-end Dev   | Desenvolver tela de login e home           | 09/09  | 17/09 | ❌      | Protótipo |
| Luis Henrique Nicodemos | Back-end Dev  | Criar banco de dados e rotas básicas       | 10/09  | 20/09 | ❌      | Código    |
| Messias Junio        | QA/Documentação | Testes iniciais e validação funcional      | 18/09  | 24/09 | ❌      | README.md |
| Todos                | Organização     | Preparar apresentação parcial              | 25/09  | 30/09 | ❌      | Slides    |

---

### 🔴 Sprint 4 – Finalização e Relatório Final  

**Período estimado:** 01/10 a 10/10  
**Objetivo:** Concluir o sistema, realizar testes integrados e entregar relatório final (APC/SGA).  

| Responsável          | Função no Grupo | Tarefa                                   | Início | Prazo | Status | Entrega   |
|-----------------------|-----------------|------------------------------------------|--------|-------|--------|-----------|
| Luis Henrique Nicodemos | Back-end Dev  | Finalizar rotinas de persistência         | 01/10  | 08/10 | ❌      | Código    |
| Gabriel Marinho       | Front-end Dev  | Finalizar interface e aplicar feedback UX | 02/10  | 10/10 | ❌      | Protótipo |
| Messias Junio        | QA/Documentação | Testar sistema completo e consolidar relatório | 06/10 | 10/10 | ❌      | README.md + APC |
| Todos                | Organização     | Entregar versão final e relatório no SGA  | 08/10  | 10/10 | ❌      | GitHub/SGA |

---

## 🔗 Links Úteis

- [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://kanbanize.com/pt/blog/implantacao-scrum/)  
- [Scrum em 9 minutos (YouTube)](https://www.youtube.com/watch?v=9TycLR0TqFA)  
