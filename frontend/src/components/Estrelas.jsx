function Estrelas({ nota }) {
  const texto = "★".repeat(nota) + "☆".repeat(5 - nota);
  return <span aria-hidden="true">{texto}</span>;
}

export default Estrelas;
