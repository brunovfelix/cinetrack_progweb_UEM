import Titulo from "./Titulo.jsx";

function Header({ busca, aoBuscar }) {
  return (
    <header>
      <Titulo />
      <input
        type="search"
        placeholder="Buscar filme..."
        aria-label="Buscar filme"
        value={busca}
        onChange={(e) => aoBuscar(e.target.value)}
      />
      <button type="button">+ Adicionar</button>
    </header>
  );
}

export default Header;
