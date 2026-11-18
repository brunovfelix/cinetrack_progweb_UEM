const OPCOES = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "assistido", rotulo: "Assistido" },
  { valor: "assistindo", rotulo: "Assistindo" },
  { valor: "quero", rotulo: "Quero assistir" },
];

function Filtros({ ativo, aoMudar }) {
  return (
    <nav aria-label="Filtros de status">
      {OPCOES.map(({ valor, rotulo }) => (
        <button
          key={valor}
          type="button"
          className={valor === ativo ? "ativo" : ""}
          aria-pressed={valor === ativo}
          onClick={() => aoMudar(valor)}
        >
          {rotulo}
        </button>
      ))}
    </nav>
  );
}

export default Filtros;
