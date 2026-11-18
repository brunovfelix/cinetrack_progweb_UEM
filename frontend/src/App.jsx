import { useState, useEffect } from "react";
import { gerarId } from "./data/filmes.js";
import { listar } from "./api.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

// Calculado uma vez, ao carregar o módulo: o render fica puro
const anoAtual = new Date().getFullYear();

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  // null: modal fechado; {}: novo filme; filme com id: edição
  const [editando, setEditando] = useState(null);

  // [] : roda só depois do primeiro render
  useEffect(() => {
    listar()
      .then((dados) => setFilmes(dados))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  // Roda sempre que o total de filmes muda
  useEffect(() => {
    document.title = `CineTrack (${filmes.length})`;
  }, [filmes.length]);

  // Estado derivado: recalculado a cada render, nunca guardado em estado
  const termo = busca.trim().toLowerCase();
  const visiveis = filmes
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) => filme.titulo.toLowerCase().includes(termo));

  function adicionar(novoFilme) {
    setFilmes((anteriores) => [
      ...anteriores,
      { ...novoFilme, id: gerarId(anteriores) },
    ]);
  }

  function editar(id, alteracoes) {
    setFilmes((anteriores) =>
      anteriores.map((filme) =>
        filme.id === id ? { ...filme, ...alteracoes, id } : filme));
  }

  function remover(id) {
    if (!confirm("Remover este filme?")) return;
    setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
  }

  function salvar(dados) {
    if (editando.id) {
      editar(editando.id, dados);
    } else {
      adicionar(dados);
    }
    setEditando(null);
  }

  // O vazio continua tratado dentro do ListaFilmes
  let conteudo;
  if (carregando) {
    conteudo = <p className="aviso">Carregando...</p>;
  } else if (erro) {
    conteudo = <p className="aviso erro" role="alert">Erro: {erro}</p>;
  } else {
    conteudo = <ListaFilmes filmes={visiveis} aoEditar={setEditando} aoRemover={remover} />;
  }

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => setEditando({})} />
      <Filtros ativo={status} aoMudar={setStatus} />
      <main>{conteudo}</main>
      <footer>
        <small>
          CineTrack © {anoAtual} · {filmes.length} filmes cadastrados
        </small>
      </footer>

      {editando !== null && (
        <ModalFilme
          filme={editando}
          aoSalvar={salvar}
          aoFechar={() => setEditando(null)}
        />
      )}
    </>
  );
}

export default App;
