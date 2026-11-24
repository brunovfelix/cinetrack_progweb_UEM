import { filmesIniciais } from "./filmes.js";
import {
  contagemPorStatus,
  mediaNotas,
  ordenarPorNota,
} from "./estatisticas.js";

document.querySelector("#media-notas").textContent = mediaNotas(filmesIniciais);
document.querySelector("#contagem-status").textContent = JSON.stringify(
  contagemPorStatus(filmesIniciais),
);

const lista = document.querySelector("#filmes");
for (const filme of ordenarPorNota(filmesIniciais)) {
  const item = document.createElement("li");
  item.textContent = `${filme.titulo} — ${filme.nota} estrelas`;
  lista.append(item);
}
