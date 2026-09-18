// Funções puras: sem DOM e sem console.log por dentro
function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status;
}

const estrelas = (nota) => {
    let texto = "";
    for (let i = 1; i <= 5; i++) {
        texto += i <= nota ? "★" : "☆";
    }
    return texto;
};

// Teste no console
console.log(rotuloStatus("quero"), estrelas(3));

// Primeiro card reescrito pelas funções
const NOTA_PRIMEIRO = 5;
const primeiroCard = document.querySelector(".card");
const badge = primeiroCard.querySelector(".badge");
const nota = primeiroCard.querySelector(".nota");
badge.textContent = rotuloStatus("assistido");
nota.textContent = estrelas(NOTA_PRIMEIRO);
nota.setAttribute("aria-label", `Nota: ${NOTA_PRIMEIRO} de 5 estrelas`);

// Rodapé dinâmico
const TOTAL = 6;
document.querySelector("footer small").textContent =
    `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;
