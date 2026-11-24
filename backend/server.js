const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const arquivoFilmes = path.join(__dirname, "data", "filmes.json");

app.use(morgan("dev"));
app.use(express.json());

function lerFilmes() {
  return JSON.parse(fs.readFileSync(arquivoFilmes, "utf8"));
}

app.get("/filmes", (req, res) => {
  const filmes = lerFilmes();
  const resultado = req.query.status
    ? filmes.filter((filme) => filme.status === req.query.status)
    : filmes;
  res.json(resultado);
});

app.get("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filme = lerFilmes().find((item) => item.id === id);

  if (!filme) {
    return res.status(404).json({ mensagem: "Filme não encontrado." });
  }

  res.json(filme);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
