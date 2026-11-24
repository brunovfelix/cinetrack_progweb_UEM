// ---------- Funções puras (Aula 1 e 4) ----------

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

function validarFilme(filme) {
    const erros = [];
    if (!filme.titulo) erros.push("Título obrigatório");
    if (!filme.genero) erros.push("Gênero obrigatório");
    if (!filme.status) erros.push("Status obrigatório");
    if (filme.ano < 1888 || filme.ano > 2030) erros.push("Ano inválido");
    return { valido: erros.length === 0, erros };
}

const gerarId = (lista) => Math.max(0, ...lista.map((f) => f.id)) + 1;

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

function aplicarFiltros(lista, opcoes) {
    const termo = opcoes.termo.toLowerCase();
    return lista
        .filter((f) => f.titulo.toLowerCase().includes(termo))
        .filter((f) => opcoes.status === "todos" || f.status === opcoes.status);
}

// ---------- Dados (Aula 2) ----------

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

// ---------- Persistência (Aula 5) ----------

const CHAVE = "cinetrack:filmes";

const salvar = () =>
    localStorage.setItem(CHAVE, JSON.stringify(filmes));

function carregar() {
    const txt = localStorage.getItem(CHAVE);
    return txt ? JSON.parse(txt) : [...filmesIniciais];
}

let filmes = carregar();
let termoAtual = "";
let statusAtual = "todos";
let ordemAtual = "";
let editandoId = null;

// ---------- Seleção no DOM (Aula 2 e 3) ----------

const listaEl = document.querySelector("#lista");
const rodapeEl = document.querySelector("footer small");
const nav = document.querySelector("nav");
const busca = document.querySelector("#busca");
const ordenar = document.querySelector("#ordenar");
const modal = document.querySelector("#modal");
const modalTitulo = document.querySelector("#modal-titulo");
const form = document.querySelector("#form-filme");

// ---------- Criação dinâmica dos cards (Aula 4) ----------

function criarCard(f) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = f.id;

    const img = document.createElement("img");
    img.src = f.poster;
    img.alt = `Pôster do filme ${f.titulo}`;

    const titulo = document.createElement("h2");
    titulo.textContent = f.titulo;

    const info = document.createElement("p");
    info.textContent = `${f.ano} • ${f.genero}`;

    const nota = document.createElement("p");
    nota.className = "nota";
    nota.textContent = `Nota: ${estrelas(f.nota)}`;
    nota.setAttribute("aria-label", `Nota: ${f.nota} de 5 estrelas`);

    const badge = document.createElement("span");
    badge.className = `badge status-${f.status}`;
    badge.textContent = rotuloStatus(f.status);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "Editar";

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "Remover";

    acoes.append(btnEditar, btnRemover);
    card.append(img, titulo, info, nota, badge, acoes);
    return card;
}

function renderizarCards(lista) {
    const frag = document.createDocumentFragment();
    lista.forEach((f) => frag.appendChild(criarCard(f)));
    listaEl.replaceChildren(frag);
}

// ---------- Ponto único de atualização (Aula 5) ----------

function atualizar() {
    const filtrados = aplicarFiltros(filmes, {
        termo: termoAtual,
        status: statusAtual
    });
    const comparadores = {
        titulo: (a, b) => a.titulo.localeCompare(b.titulo, "pt-BR"),
        ano: (a, b) => a.ano - b.ano,
        nota: (a, b) => b.nota - a.nota
    };
    const visiveis = ordemAtual
        ? [...filtrados].sort(comparadores[ordemAtual])
        : filtrados;
    renderizarCards(visiveis);
    rodapeEl.textContent =
        `CineTrack © 2026 · ${filmes.length} filmes cadastrados`;
}

// ---------- Modal: abrir/fechar (Aula 4) ----------

const abrir = () => { modal.hidden = false; };
const fechar = () => { modal.hidden = true; };

document.querySelector("#btn-adicionar").addEventListener("click", () => {
    editandoId = null;
    form.reset();
    modalTitulo.textContent = "Adicionar filme";
    abrir();
});

document.querySelector("#btn-cancelar").addEventListener("click", () => {
    fechar();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) fechar();
});

// ---------- Envio do formulário: adicionar ou editar (Aula 4) ----------

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(form));
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);

    const { valido, erros } = validarFilme(dados);
    if (!valido) {
        alert(erros.join("\n"));
        return;
    }

    if (editandoId !== null) {
        filmes = filmes.map((f) =>
            f.id === editandoId ? { ...f, ...dados } : f);
    } else {
        filmes = [...filmes, { id: gerarId(filmes), ...dados }];
    }

    salvar();
    fechar();
    atualizar();
});

ordenar.addEventListener("change", (e) => {
    ordemAtual = e.target.value;
    atualizar();
});

// ---------- Delegação: filtros por status (Aula 3) ----------

nav.addEventListener("click", (e) => {
    const botao = e.target.closest("button");
    if (!botao) return;
    nav.querySelector(".ativo").classList.remove("ativo");
    botao.classList.add("ativo");
    statusAtual = botao.dataset.status;
    atualizar();
});

// ---------- Delegação: editar e remover cards (Aula 3 e 4) ----------

listaEl.addEventListener("click", (e) => {
    const btnRemover = e.target.closest(".btn-remover");
    if (btnRemover) {
        if (!confirm("Remover este filme?")) return;
        const card = btnRemover.closest(".card");
        const id = Number(card.dataset.id);
        filmes = filmes.filter((f) => f.id !== id);
        salvar();
        atualizar();
        return;
    }

    const btnEditar = e.target.closest(".btn-editar");
    if (btnEditar) {
        const card = btnEditar.closest(".card");
        editandoId = Number(card.dataset.id);
        const f = filmes.find((x) => x.id === editandoId);
        form.elements.titulo.value = f.titulo;
        form.elements.ano.value = f.ano;
        form.elements.genero.value = f.genero;
        form.elements.poster.value = f.poster ?? "";
        form.elements.status.value = f.status;
        form.elements.nota.value = f.nota ?? "";
        form.elements.comentario.value = f.comentario ?? "";
        modalTitulo.textContent = "Editar filme";
        abrir();
    }
});

// ---------- Busca em tempo real, com debounce (Aula 5) ----------

const aoDigitar = (e) => {
    termoAtual = e.target.value;
    atualizar();
};

busca.addEventListener("input", debounce(aoDigitar, 300));

// ---------- Primeira renderização ----------

atualizar();
