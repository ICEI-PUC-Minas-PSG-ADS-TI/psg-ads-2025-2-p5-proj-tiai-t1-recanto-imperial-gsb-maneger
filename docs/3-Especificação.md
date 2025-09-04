# 3. Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="2-Planejamento-Projeto.md"> Planejamento do Projeto do Software (Cronograma) </a></span>

---

## 3.1 Requisitos Funcionais

Os requisitos funcionais detalham as funcionalidades que o sistema **Recanto Imperial GSB Manager** deverá oferecer, garantindo clareza no desenvolvimento e validação.

|ID     | Descrição do Requisito                                                                                                                      | Prioridade |
|-------|---------------------------------------------------------------------------------------------------------------------------------------------|------------|
|RF-01  | O sistema deve permitir o cadastro e gerenciamento de aves (GSB), incluindo dados como anilha, linhagem e idade.                            | ALTA       |
|RF-02  | O sistema deve permitir o registro de cruzamentos entre aves, com histórico de genética e descendentes.                                     | ALTA       |
|RF-03  | O sistema deve gerar relatórios em PDF com informações de aves, cruzamentos e genealogia.                                                   | MÉDIA      |
|RF-04  | O sistema deve permitir a pesquisa e filtragem de aves por anilha, linhagem, idade e status.                                                | ALTA       |
|RF-05  | O sistema deve manter um histórico de eventos importantes (ex.: nascimento, óbito, venda de aves).                                          | MÉDIA      |
|RF-06  | O sistema deve fornecer dashboards com indicadores básicos (número de aves ativas, cruzamentos realizados, etc).                            | MÉDIA      |
|RF-07  | O sistema deve permitir ao usuário criar backups do banco de dados local (SQLite) para um local especificado.                               | ALTA       |
|RF-08  | O sistema deve permitir ao usuário restaurar o banco de dados local (SQLite) a partir de um backup pré-existente em um local especificado.  | ALTA       |

---

## 3.2 Histórias de Usuário

As histórias de usuário foram adaptadas ao cenário real: **um único criatório com um único usuário**, sem necessidade de login, senha ou múltiplos perfis.

- **História 1 (RF-01):**  
  Como **criador do Recanto Imperial GSB**, quero cadastrar e gerenciar minhas aves com todos os dados relevantes, para manter controle genético e organizacional do plantel.

- **História 2 (RF-02):**  
  Como **criador**, quero registrar cruzamentos entre minhas aves, para garantir rastreabilidade e acompanhar a qualidade genética.

- **História 3 (RF-03):**  
  Como **criador**, quero gerar relatórios em PDF com informações completas, para documentar e compartilhar dados do criatório.

- **História 4 (RF-04):**  
  Como **criador**, quero pesquisar minhas aves por anilha, linhagem ou idade, para localizar informações de forma rápida.

- **História 5 (RF-05):**  
  Como **criador**, quero registrar eventos como nascimento, óbito ou venda, para manter atualizado o histórico de cada ave.

- **História 6 (RF-06):**  
  Como **criador**, quero visualizar dashboards com indicadores do plantel, para acompanhar a evolução do meu criatório.

- **História 7 (RF-07):**  
  Como **criador**, quero realizar backup e restauração dos dados, para garantir que nenhuma informação seja perdida.

---

## 3.3 Requisitos Não Funcionais

Os requisitos não funcionais definem as **características de qualidade** do sistema, garantindo segurança, desempenho e confiabilidade.

|ID     | Descrição do Requisito                                                                              | Prioridade |
|-------|-----------------------------------------------------------------------------------------------------|------------|
|RNF-01 | O sistema deve carregar telas e consultas em até 3 segundos.                                        | MÉDIA      | 
|RNF-02 | O sistema deve ser multiplataforma (compatível com Windows e Linux).                                | ALTA       |
|RNF-03 | O sistema deve armazenar dados em banco local (SQLite) para simplicidade e portabilidade.            | ALTA       |
|RNF-04 | O sistema deve ter interface simples e responsiva, de fácil uso mesmo para usuários com pouca experiência em tecnologia.| MÉDIA |

---

## 3.4 Restrições do Projeto

As restrições representam **limitações técnicas, organizacionais e de prazo** que influenciam diretamente o desenvolvimento do projeto.

| ID   | Restrição                                                                 |
|------|---------------------------------------------------------------------------|
| R-01 | O projeto deverá ser entregue até o final do semestre acadêmico.          |
| R-02 | O sistema deve ser desenvolvido utilizando **.NET ou JavaScript**.        |
| R-03 | O banco de dados utilizado será **SQLite** para simplificar a integração. |
| R-04 | O software deve ser compatível com **Windows e Linux**.                   |
| R-05 | O sistema deverá operar **offline** (não depender de internet).           |
| R-06 | O projeto deve seguir as normas de documentação definidas pela disciplina.|
| R-07 | A interface deve ser desenvolvida em português (BR).                      |
| R-08 | O código deve ser versionado e entregue em repositório GitHub.            |

---

## 3.5 Regras de Negócio

As regras de negócio estabelecem as condições obrigatórias que o sistema deve obedecer, assegurando alinhamento com as práticas do criatório.

|ID    | Regra de Negócio                                                                 |
|-------|---------------------------------------------------------------------------------|
|RN-01 | Cada ave deve possuir uma **anilha única** para identificação no sistema.        |
|RN-02 | Um cruzamento só pode ser registrado se ambas as aves estiverem **ativas**.      |
|RN-03 | Eventos de óbito ou venda devem alterar automaticamente o status da ave.         |
|RN-04 | Apenas aves devidamente cadastradas podem ser associadas a cruzamentos.          |
|RN-05 | Relatórios devem conter data/hora de emissão e identificação do criatório.       |

---

## 🔗 Links Úteis

- [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)  
- [Exemplos práticos de requisitos funcionais e não funcionais](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)  
