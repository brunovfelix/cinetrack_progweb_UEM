const API_URL = "http://localhost:3000";

async function requisicao(url, opcoes) {
  const resposta = await fetch(url, opcoes);

  if (!resposta.ok) {
    const erro = await resposta.json();
    throw new Error(
      erro.mensagem || erro.erro || `Falha na requisição (${resposta.status}).`,
    );
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
