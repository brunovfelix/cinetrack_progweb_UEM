import { filmesIniciais } from "./data/filmes.js";
import Header from "./components/Header.jsx";
import Filtros from "./components/Filtros.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";

// Calculado uma vez, ao carregar o módulo: o render fica puro
const anoAtual = new Date().getFullYear();

function App() {
  return (
    <>
      <Header />
      <Filtros />
      <main>
        <ListaFilmes filmes={filmesIniciais} />
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
