import Titulo from "./Titulo.jsx";

function Header() {
  return (
    <header>
      <Titulo />
      <input type="search" placeholder="Buscar filme..." aria-label="Buscar filme" />
      <button type="button">+ Adicionar</button>
    </header>
  );
}

export default Header;
