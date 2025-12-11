import { db } from "../config/db.js";

// 🐔 Lista todas as aves
export const listarAves = (req, res) => {
  db.query("SELECT * FROM Aves", (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(result);
  });
};

// 🐣 Cadastra uma nova ave
export const cadastrarAve = (req, res) => {
  const { anilha, nome, linhagem, sexo, dataNascimento, idade, peso, status } = req.body;

  if (!anilha) return res.status(400).json({ erro: "O campo anilha é obrigatório." });

  const sql = `
    INSERT INTO Aves (anilha, nome, linhagem, sexo, dataNascimento, idade, peso, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [anilha, nome, linhagem, sexo, dataNascimento, idade, peso, status], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ message: "✅ Ave cadastrada com sucesso!", id: result.insertId });
  });
};

// 🗑️ Deleta uma ave por ID
export const deletarAve = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM Aves WHERE idAve = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Ave não encontrada." });
    res.json({ message: "🗑️ Ave deletada com sucesso!" });
  });
};
