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
