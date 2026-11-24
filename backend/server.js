const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const arquivoFilmes = path.join(__dirname, "data", "filmes.json");
const statusValidos = ["assistido", "assistindo", "quero"];

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

function validarFilme(filme) {
  const erros = [];

  if (typeof filme.titulo !== "string" || !filme.titulo.trim()) {
    erros.push("Título obrigatório");
  }
  if (typeof filme.genero !== "string" || !filme.genero.trim()) {
    erros.push("Gênero obrigatório");
  }
  if (!Number.isInteger(filme.ano) || filme.ano < 1888 || filme.ano > 2030) {
    erros.push("Ano inválido");
  }
  if (!Number.isInteger(filme.nota) || filme.nota < 1 || filme.nota > 5) {
    erros.push("Nota inválida (use um valor de 1 a 5)");
  }
  if (!filme.status) {
    erros.push("Status obrigatório");
  } else if (!statusValidos.includes(filme.status)) {
    erros.push("Status inválido");
  }

  return erros;
}

app.get("/filmes", (req, res) => {
  const filmes = lerFilmes();
  const status = req.query.status;
  const termo = String(req.query.q || "").trim().toLowerCase();
  const resultado = filmes.filter((filme) => {
    const correspondeStatus = !status || filme.status === status;
    const correspondeBusca = !termo || filme.titulo.toLowerCase().includes(termo);
    return correspondeStatus && correspondeBusca;
  });
  res.json(resultado);
});

app.get("/stats", (req, res) => {
  const filmes = lerFilmes();
  const estatisticas = filmes.reduce((resultado, filme) => {
    resultado.total += 1;
    resultado.porStatus[filme.status] =
      (resultado.porStatus[filme.status] || 0) + 1;
    resultado.somaNotas += filme.nota;
    return resultado;
  }, {
    total: 0,
    porStatus: { assistido: 0, assistindo: 0, quero: 0 },
    somaNotas: 0,
  });

  res.json({
    total: estatisticas.total,
    porStatus: estatisticas.porStatus,
    mediaNotas: estatisticas.total
      ? Number((estatisticas.somaNotas / estatisticas.total).toFixed(1))
      : 0,
  });
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
  const erros = validarFilme(dados);
  if (erros.length > 0) {
    return res.status(400).json({ erros });
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

  const atualizado = {
    ...filmes[indice],
    ...(req.body || {}),
    id: filmes[indice].id,
  };
  const erros = validarFilme(atualizado);
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  filmes[indice] = atualizado;
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
