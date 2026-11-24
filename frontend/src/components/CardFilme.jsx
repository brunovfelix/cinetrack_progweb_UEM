import Estrelas from "./Estrelas.jsx";
import Badge from "./Badge.jsx";

function CardFilme({ filme, aoEditar, aoRemover }) {
  const { titulo, ano, genero, poster, nota, status, comentario } = filme;

  return (
    <article className="card">
      {poster && <img src={poster} alt={`Pôster do filme ${titulo}`} />}
      <h2>{titulo}</h2>
      <p>{ano} • {genero}</p>
      <p className="nota" aria-label={`Nota: ${nota} de 5 estrelas`}>
        Nota: <Estrelas nota={nota} />
      </p>
      <Badge status={status} />
      {comentario && <p className="comentario">{comentario}</p>}
      <div className="acoes">
        <button type="button" onClick={() => aoEditar(filme)}>Editar</button>
        <button type="button" onClick={() => aoRemover(filme.id)}>Remover</button>
      </div>
    </article>
  );
}

export default CardFilme;
