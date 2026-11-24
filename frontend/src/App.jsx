import { useState, useEffect } from "react";
import { listar, criar, atualizar, remover } from "./api.js";
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
    async function carregar() {
      try {
        const dados = await listar();
        setFilmes(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
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

  async function removerFilme(id) {
    if (!confirm("Remover este filme?")) return;

    try {
      await remover(id);
      setFilmes((anteriores) => anteriores.filter((filme) => filme.id !== id));
      setErro(null);
    } catch (e) {
      setErro(e.message);
    }
  }

  async function salvar(dados) {
    try {
      if (editando.id) {
        const atualizado = await atualizar(editando.id, dados);
        setFilmes((anteriores) =>
          anteriores.map((filme) =>
            filme.id === atualizado.id ? atualizado : filme));
      } else {
        const criado = await criar(dados);
        setFilmes((anteriores) => [...anteriores, criado]);
      }
      setErro(null);
      setEditando(null);
    } catch (e) {
      setErro(e.message);
    }
  }

  // O vazio continua tratado dentro do ListaFilmes
  let conteudo;
  if (carregando) {
    conteudo = <p className="aviso">Carregando...</p>;
  } else if (erro) {
    conteudo = <p className="aviso erro" role="alert">Erro: {erro}</p>;
  } else {
    conteudo = <ListaFilmes filmes={visiveis} aoEditar={setEditando} aoRemover={removerFilme} />;
  }

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => setEditando({})} />
      <Filtros ativo={status} aoMudar={setStatus} />
      <p className="aviso">Exibindo {visiveis.length} de {filmes.length} filmes</p>
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
