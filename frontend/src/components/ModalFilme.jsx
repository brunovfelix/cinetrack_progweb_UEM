import { useState, useEffect } from "react";

const VAZIO = {
  titulo: "",
  ano: "",
  genero: "",
  poster: "",
  status: "quero",
  nota: 3,
  comentario: "",
};

// Portada da Parte 1
function validarFilme(filme) {
  const erros = [];
  if (!filme.titulo.trim()) erros.push("Título obrigatório");
  if (!filme.genero.trim()) erros.push("Gênero obrigatório");
  if (!filme.status) erros.push("Status obrigatório");
  if (filme.ano < 1888 || filme.ano > 2030) erros.push("Ano inválido");
  return erros;
}

function ModalFilme({ filme, erroServidor, aoSalvar, aoFechar }) {
  // Os campos do filme em edição sobrescrevem os de VAZIO
  const [dados, setDados] = useState({ ...VAZIO, ...filme });
  const [erros, setErros] = useState([]);

  // Esc fecha o modal; a limpeza remove o ouvinte quando o modal sai da tela
  useEffect(() => {
    function aoTeclar(e) {
      if (e.key === "Escape") aoFechar();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aoFechar]);

  function atualizar(campo, valor) {
    setDados((anteriores) => ({ ...anteriores, [campo]: valor }));
  }

  function submeter(evento) {
    evento.preventDefault();
    const convertido = { ...dados, ano: Number(dados.ano), nota: Number(dados.nota) };
    const problemas = validarFilme(convertido);
    if (problemas.length > 0) {
      setErros(problemas);
      return;
    }
    aoSalvar(convertido);
  }

  return (
    <div id="modal">
      <div className="modal-conteudo" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
        <h2 id="modal-titulo">{filme.id ? "Editar filme" : "Adicionar filme"}</h2>

        {erros.length > 0 && (
          <ul className="erros" role="alert">
            {erros.map((erro) => <li key={erro}>{erro}</li>)}
          </ul>
        )}

        {erroServidor && (
          <p className="erros" role="alert">Erro ao salvar: {erroServidor}</p>
        )}

        <form onSubmit={submeter}>
          <label htmlFor="titulo">Título</label>
          <input id="titulo" type="text" required
            value={dados.titulo}
            onChange={(e) => atualizar("titulo", e.target.value)} />

          <label htmlFor="ano">Ano</label>
          <input id="ano" type="number" min="1888" max="2030" step="1" required
            value={dados.ano}
            onChange={(e) => atualizar("ano", e.target.value)} />

          <label htmlFor="genero">Gênero</label>
          <input id="genero" type="text" required
            value={dados.genero}
            onChange={(e) => atualizar("genero", e.target.value)} />

          <label htmlFor="poster">URL do pôster</label>
          <input id="poster" type="url"
            value={dados.poster}
            onChange={(e) => atualizar("poster", e.target.value)} />

          <label htmlFor="status">Status</label>
          <select id="status" required
            value={dados.status}
            onChange={(e) => atualizar("status", e.target.value)}>
            <option value="assistido">Assistido</option>
            <option value="assistindo">Assistindo</option>
            <option value="quero">Quero assistir</option>
          </select>

          <label htmlFor="nota">Nota (1 a 5)</label>
          <input id="nota" type="number" min="1" max="5" step="1"
            value={dados.nota}
            onChange={(e) => atualizar("nota", e.target.value)} />

          <label htmlFor="comentario">Comentário</label>
          <textarea id="comentario"
            value={dados.comentario}
            onChange={(e) => atualizar("comentario", e.target.value)} />

          <button type="button" onClick={aoFechar}>Cancelar</button>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalFilme;
