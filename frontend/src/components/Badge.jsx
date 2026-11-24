const ROTULOS = {
  assistido: "Assistido",
  assistindo: "Assistindo",
  quero: "Quero assistir",
};

function Badge({ status }) {
  return (
    <span className={`badge status-${status}`}>
      {ROTULOS[status] || status}
    </span>
  );
}

export default Badge;
