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

const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção científica",
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Sonhos dentro de sonhos e uma trilha inesquecível."
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        nota: 4,
        status: "assistido",
        comentario: "Crítica social afiada, com reviravoltas surpreendentes."
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "https://image.tmdb.org/t/p/w500/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Clássico do humor brasileiro, sempre vale rever."
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção científica",
        poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        nota: 4,
        status: "assistindo",
        comentario: "Visual impressionante; ainda no meio do filme."
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        nota: 5,
        status: "quero",
        comentario: "Quero rever numa tela grande."
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
        nota: 4,
        status: "quero",
        comentario: "Recomendado por amigos, ainda não assisti."
    }
];

const lista = document.querySelector("#lista");

function renderizarCards(filmes) {
    const cards = filmes.map((f) => `
        <article class="card" data-id="${f.id}">
            <img src="${f.poster}" alt="Pôster do filme ${f.titulo}">
            <h2>${f.titulo}</h2>
            <p>${f.ano} • ${f.genero}</p>
            <p class="nota" aria-label="Nota: ${f.nota} de 5 estrelas">${estrelas(f.nota)}</p>
            <span class="badge">${rotuloStatus(f.status)}</span>
            <div class="acoes">
                <button type="button">Editar</button>
                <button type="button">Remover</button>
            </div>
        </article>`).join("");
    lista.innerHTML = cards;
}

renderizarCards(filmesIniciais);

// Rodapé dinâmico
const TOTAL = filmesIniciais.length;
document.querySelector("footer small").textContent =
    `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;
