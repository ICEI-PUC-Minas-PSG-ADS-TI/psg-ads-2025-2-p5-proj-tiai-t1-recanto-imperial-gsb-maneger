# Recanto Imperial GSB Manager

## 1. Introdução  

O **Recanto Imperial GSB Manager** é um sistema desktop projetado para atender às demandas específicas da criação e gestão da **Galinha Sertaneja Balão (GSB)**.  
A proposta central consiste em fornecer uma plataforma robusta para **cadastro, acompanhamento e análise genética**, garantindo rastreabilidade e conformidade com os padrões raciais estabelecidos pela **ABRASB (Associação Brasileira de Criadores da Galinha Sertaneja Balão)**.  

O projeto foi concebido para solucionar as dificuldades enfrentadas por criadores no gerenciamento manual de informações, oferecendo **automação, confiabilidade e transparência**.  

---

## 1.1 Problema  

A criação da GSB requer controle rigoroso de informações, tais como:  
- Linhagem genética (pais, mães, descendentes).  
- Características fenotípicas (crista, plumagem, canelas, peso, etc.).  
- Histórico reprodutivo e substituição de matrizes.  
- Documentação para comercialização e registro oficial.  

No cenário atual, a maioria dos criadores utiliza métodos manuais (planilhas ou cadernos), resultando em:  
- **Perda ou inconsistência de dados**.  
- **Dificuldade na comprovação genética** durante vendas ou exposições.  
- **Falta de relatórios técnicos** alinhados ao padrão racial oficial.  

---

## 1.2 Objetivos  

### Objetivo Geral  
Desenvolver um **sistema desktop multiplataforma** que permita o gerenciamento completo de criatórios da raça GSB, integrando cadastro de aves, análise genética, genealogia e geração de relatórios técnicos.  

### Objetivos Específicos  
- Estruturar o **cadastro individual de aves** (dados de nascimento, penugem, sexo, peso, características físicas, pais e mães).  
- Implementar um **módulo de conformidade genética**, com base na cartilha oficial da raça, para atribuição de pontuação e observações técnicas.  
- Desenvolver a **geração automática de árvore genealógica**, exportável em **PDF** com layout profissional.  
- Criar um **histórico de substituições** de matrizes e reprodutores, garantindo rastreabilidade total.  
- Permitir **integração de fotos** no perfil de cada ave para documentação visual.  
- Gerar relatórios técnicos consolidados para clientes no momento da venda.  

---

## 1.3 Justificativa  

A **Galinha Sertaneja Balão (GSB)** é fruto de mais de seis décadas de aprimoramento genético, configurando-se como uma raça de relevância cultural e zootécnica no Brasil.  
O processo de seleção exige conformidade com padrões rígidos, sendo imprescindível uma solução digital para assegurar a **gestão precisa e profissional do plantel**.  

A implementação deste sistema proporcionará:  
- **Eficiência Operacional**: eliminação de controles manuais suscetíveis a falhas.  
- **Padronização Técnica**: registros alinhados à cartilha oficial da ABRASB.  
- **Transparência Comercial**: relatórios claros e rastreáveis para clientes.  
- **Valorização da Raça**: maior credibilidade junto ao mercado e associações.  
- **Inovação**: recurso inédito de árvore genealógica automática aplicada à avicultura de raças nativas.  

---

## 1.4 Público-Alvo  

O sistema é voltado a **criadores de GSB** que necessitam de uma ferramenta de apoio à gestão técnica e comercial.  

**Perfil dos Usuários**:  
- Pequenos e médios criadores.  
- Faixa etária: 20 a 60 anos.  
- Nível de escolaridade variável, com **conhecimento básico em informática**.  
- Interessados em profissionalizar a criação, aumentar a confiabilidade do plantel e valorizar a comercialização.  

**Contexto de Uso**:  
- Ambiente desktop (Windows e Linux).  
- Utilização no dia a dia do criatório para cadastro, manejo, análise e emissão de relatórios.  
- Ferramenta intuitiva, mas tecnicamente precisa, conciliando usabilidade com rigor informacional.  

---

## 2. Tecnologias e Arquitetura  

- **Linguagem de Programação**:  
  - .NET (C#) para robustez e escalabilidade **ou**  
  - Electron/JavaScript para portabilidade multiplataforma.  

- **Banco de Dados**:  
  - **SQLite**: leve, local e de fácil integração (ideal para criadores individuais).  
  - Escalável futuramente para **MySQL/PostgreSQL** caso seja necessário integração em nuvem.  

- **Funcionalidades-Chave**:  
  - CRUD completo de aves (Create, Read, Update, Delete).  
  - Sistema de **pontuação e conformidade** baseado na cartilha oficial da GSB.  
  - **Árvore genealógica visual** automática.  
  - Exportação de relatórios em **PDF**.  
  - **Histórico de reprodutores** e matrizes.  
  - Upload e visualização de imagens.  

- **Possibilidades Futuras**:  
  - Integração com API da ABRASB para validação oficial.  
  - Backup em nuvem.  
  - Relatórios estatísticos avançados (fertilidade, taxa de choco, desempenho reprodutivo).  

---

## 3. Impacto Esperado  

- **Técnico**: garantia de fidelidade ao padrão genético da raça.  
- **Comercial**: diferenciação do criador no mercado com documentação profissional.  
- **Acadêmico**: contribuição para estudos de seleção genética e zootecnia aplicada.  
- **Social**: fortalecimento da comunidade de criadores e preservação de uma raça nativa brasileira.  

---

## 📌 Roadmap (Visão Geral)  

**MVP – Versão Inicial**  
   - Cadastro básico de aves.  
   - Relatórios simples em PDF.  
   - Armazenamento local (SQLite).    
   - Implementação da árvore genealógica automática.  
   - Relatórios avançados de conformidade.  
   - Upload de imagens das aves.  

---

## ✅ Conclusão  

O **Recanto Imperial GSB Manager** é uma solução inovadora para o setor de avicultura nativa, trazendo profissionalismo, padronização e inovação ao manejo da Galinha Sertaneja Balão.  
Sua implementação representa um marco no uso da tecnologia para a preservação e valorização de uma raça histórica, ao mesmo tempo em que entrega **eficiência operacional e vantagem competitiva** aos criadores.  
