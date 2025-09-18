## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

---
**ARQUITETURA DO SOFTWARE**
## 4.1. Arquitetura da Solução

Nesta seção, descreva como os componentes do sistema se organizam e interagem.  
Inclua um **diagrama de arquitetura** mostrando módulos, camadas e tecnologias utilizadas.

**Orientações:**
- Indique quais módulos compõem a solução (ex.: frontend, backend, banco de dados, APIs externas).
- Especifique as tecnologias e frameworks adotados (ex.: React, Node.js, MySQL).
- Explique como ocorre a comunicação entre os módulos.

**Exemplo de diagrama:**
 
 ![Exemplo de Arquitetura](./images/arquitetura-exemplo.png)

 📌 **Entrega:** inserir o diagrama e a descrição detalhada de cada parte.
 
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
<img width="1366" height="768" alt="Diagrama de Classes" src="https://github.com/user-attachments/assets/0b4baa99-564a-4727-96c3-b51973a22576" />


**BANCO DE DADOS**

## 4.4. Modelo de Dados

A solução proposta exige um banco de dados capaz de armazenar e relacionar as informações necessárias para os processos mapeados, garantindo integridade e controle de acesso por perfil de usuário.

O desenvolvimento deve seguir **três etapas**:

---

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


---

### 4.4.2 Esquema Relacional

O **Esquema Relacional** converte o Modelo ER para tabelas relacionais, incluindo chaves primárias, estrangeiras e restrições de integridade.  
Utilize o **[MySQL Workbench](https://www.mysql.com/products/workbench/)** para gerar o diagrama de tabelas (Modelo Lógico).

**Orientações:**
- Inclua todos os atributos das entidades.
- Defina tipos de dados adequados para cada campo.
- Configure as restrições de integridade (NOT NULL, UNIQUE, FOREIGN KEY, etc.).

📌 **Entrega:** exporte o diagrama do Workbench e adicione a imagem aqui.

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
    linhagem VARCHAR(100),
    idade INT,
    status VARCHAR(50)
);

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
📌 **Entrega:** Inclua aqui os scripts utilizados para criar coleções e inserir dados.
