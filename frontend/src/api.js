const API_URL = "http://localhost:3000";

async function requisicao(url, opcoes) {
  let resposta;
  try {
    resposta = await fetch(url, opcoes);
  } catch {
    // fetch só rejeita em falha de rede (servidor fora do ar, CORS)
    throw new Error("Não foi possível conectar ao servidor.");
  }

  if (!resposta.ok) {
    // Corpo pode não ser JSON (ex.: erro padrão do Express)
    const corpo = await resposta.json().catch(() => ({}));
    const mensagem =
      corpo.erros?.join("; ") ||
      corpo.mensagem ||
      `Falha na requisição (${resposta.status}).`;
    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

export async function listar() {
  return requisicao(`${API_URL}/filmes`);
}

export async function criar(filme) {
  return requisicao(`${API_URL}/filmes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filme),
  });
}

export async function atualizar(id, filme) {
  return requisicao(`${API_URL}/filmes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filme),
  });
}

export async function remover(id) {
  return requisicao(`${API_URL}/filmes/${id}`, { method: "DELETE" });
}
