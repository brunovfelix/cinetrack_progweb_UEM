export function mediaNotas(lista) {
  if (lista.length === 0) return 0;
  const soma = lista.reduce((total, filme) => total + filme.nota, 0);
  return soma / lista.length;
}

export function contagemPorStatus(lista) {
  return lista.reduce(
    (contagem, filme) => {
      contagem[filme.status] = (contagem[filme.status] || 0) + 1;
      return contagem;
    },
    { assistido: 0, assistindo: 0, quero: 0 },
  );
}

export function ordenarPorNota(lista) {
  return [...lista].sort((a, b) => b.nota - a.nota);
}
