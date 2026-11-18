// Auxiliares portados da Parte 1: não dependem de props, ficam fora do componente
function estrelas(nota) {
  return "★".repeat(nota) + "☆".repeat(5 - nota);
}

const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

function CardFilme({ filme }) {
  const { titulo, ano, genero, poster, nota, status, comentario } = filme;

  return (
    <article className="card">
      {poster && <img src={poster} alt={`Pôster do filme ${titulo}`} />}
      <h2>{titulo}</h2>
      <p>{ano} • {genero}</p>
      <p className="nota" aria-label={`Nota: ${nota} de 5 estrelas`}>
        Nota: {estrelas(nota)}
      </p>
      <span className={`badge status-${status}`}>{ROTULOS[status]}</span>
      {comentario && <p className="comentario">{comentario}</p>}
      <div className="acoes">
        <button type="button">Editar</button>
        <button type="button">Remover</button>
      </div>
    </article>
  );
}

export default CardFilme;
