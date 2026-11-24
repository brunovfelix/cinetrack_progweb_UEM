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
  // erroCarga substitui a lista; erroOperacao é um aviso que não esconde nada
  const [erroCarga, setErroCarga] = useState(null);
  const [erroOperacao, setErroOperacao] = useState(null);
  const [status, setStatus] = useState(() => {
    try {
      const filtros = JSON.parse(localStorage.getItem("cinetrack:filtros"));
      return ["todos", "assistido", "assistindo", "quero"].includes(filtros.status)
        ? filtros.status
        : "todos";
    } catch {
      return "todos";
    }
  });
  const [busca, setBusca] = useState(() => {
    try {
      const filtros = JSON.parse(localStorage.getItem("cinetrack:filtros"));
      return typeof filtros.busca === "string" ? filtros.busca : "";
    } catch {
      return "";
    }
  });
  // null: modal fechado; {}: novo filme; filme com id: edição
  const [editando, setEditando] = useState(null);

  // [] : roda só depois do primeiro render
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listar();
        setFilmes(dados);
      } catch (e) {
        setErroCarga(e.message);
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

  useEffect(() => {
    localStorage.setItem("cinetrack:filtros", JSON.stringify({ busca, status }));
  }, [busca, status]);

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
      setErroOperacao(null);
    } catch (e) {
      setErroOperacao(e.message);
    }
  }

  function abrirModal(filme) {
    setErroOperacao(null);
    setEditando(filme);
  }

  function fecharModal() {
    setErroOperacao(null);
    setEditando(null);
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
      fecharModal();
    } catch (e) {
      // O modal continua aberto e mostra o erro (ver ModalFilme)
      setErroOperacao(e.message);
    }
  }

  // O vazio continua tratado dentro do ListaFilmes
  let conteudo;
  if (carregando) {
    conteudo = <p className="aviso">Carregando...</p>;
  } else if (erroCarga) {
    conteudo = <p className="aviso erro" role="alert">Erro: {erroCarga}</p>;
  } else {
    conteudo = <ListaFilmes filmes={visiveis} aoEditar={abrirModal} aoRemover={removerFilme} />;
  }

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} aoAdicionar={() => abrirModal({})} />
      <Filtros ativo={status} aoMudar={setStatus} />
      <p className="aviso">Exibindo {visiveis.length} de {filmes.length} filmes</p>
      {erroOperacao && editando === null && (
        <p className="aviso erro" role="alert">
          Erro: {erroOperacao}{" "}
          <button type="button" onClick={() => setErroOperacao(null)}>Fechar</button>
        </p>
      )}
      <main>{conteudo}</main>
      <footer>
        <small>
          CineTrack © {anoAtual} · {filmes.length} filmes cadastrados
        </small>
      </footer>

      {editando !== null && (
        <ModalFilme
          filme={editando}
          erroServidor={erroOperacao}
          aoSalvar={salvar}
          aoFechar={fecharModal}
        />
      )}
    </>
  );
}

export default App;
