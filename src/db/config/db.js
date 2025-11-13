import mysql from "mysql2";
import dotenv from "dotenv";

// Carrega variáveis do arquivo .env
dotenv.config();
console.log("🔍 Variáveis carregadas:", process.env);

// Cria a conexão com o MySQL
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testa a conexão
db.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar ao banco MySQL:", err);
  } else {
    console.log("✅ Conexão com o banco MySQL bem-sucedida!");
  }
});
