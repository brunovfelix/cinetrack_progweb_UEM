import { useState } from "react";
import { filmesIniciais } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";

// Calculado uma vez, ao carregar o módulo: o render fica puro
const anoAtual = new Date().getFullYear();

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  // Estado derivado: recalculado a cada render, nunca guardado em estado
  const termo = busca.trim().toLowerCase();
  const visiveis = filmesIniciais
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) => filme.titulo.toLowerCase().includes(termo));

  return (
    <>
      <Header busca={busca} aoBuscar={setBusca} />
      <Filtros ativo={status} aoMudar={setStatus} />
      <main>
        <ListaFilmes filmes={visiveis} />
      </main>
      <footer>
        <small>
          CineTrack © {anoAtual} · {filmesIniciais.length} filmes cadastrados
        </small>
      </footer>
    </>
  );
}

export default App;
