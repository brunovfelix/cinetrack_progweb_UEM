const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const arquivoFilmes = path.join(__dirname, "data", "filmes.json");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

function lerFilmes() {
  return JSON.parse(fs.readFileSync(arquivoFilmes, "utf8"));
}

function salvarFilmes(lista) {
  fs.writeFileSync(arquivoFilmes, JSON.stringify(lista, null, 2));
}

function gerarId(lista) {
  return Math.max(0, ...lista.map((filme) => filme.id)) + 1;
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

app.post("/filmes", (req, res) => {
  const dados = req.body || {};
  const { titulo, ano } = dados;

  if (typeof titulo !== "string" || !titulo.trim() || ano === undefined || ano === null || ano === "") {
    return res.status(400).json({ mensagem: "Título e ano são obrigatórios." });
  }

  const filmes = lerFilmes();
  const filme = { ...dados, id: gerarId(filmes) };
  filmes.push(filme);
  salvarFilmes(filmes);

  res.status(201).json(filme);
});

app.put("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmes = lerFilmes();
  const indice = filmes.findIndex((filme) => filme.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Filme não encontrado." });
  }

  filmes[indice] = { ...filmes[indice], ...(req.body || {}), id: filmes[indice].id };
  salvarFilmes(filmes);

  res.json(filmes[indice]);
});

app.delete("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmes = lerFilmes();
  const indice = filmes.findIndex((filme) => filme.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Filme não encontrado." });
  }

  filmes.splice(indice, 1);
  salvarFilmes(filmes);

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
