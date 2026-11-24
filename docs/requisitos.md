# Requisitos do CineTrack

## Objetivo

O CineTrack organiza um catálogo pessoal de filmes. A interface da Parte 1 usa
HTML, CSS e JavaScript; o frontend React consome a API Node.js.

## Dados de um filme

Cada filme contém sete campos preenchidos pelo usuário:

| Campo | Descrição |
|---|---|
| `titulo` | Título do filme |
| `ano` | Ano de lançamento |
| `genero` | Gênero cinematográfico |
| `poster` | URL opcional do pôster |
| `nota` | Nota de 1 a 5 |
| `status` | `assistido`, `assistindo` ou `quero` |
| `comentario` | Comentário opcional |

O `id` numérico é gerado pela aplicação e não é preenchido pelo usuário.

O catálogo inicial usa os seis filmes canônicos: A Origem, Parasita, O Auto da
Compadecida, Duna: Parte Dois, Interestelar e Cidade de Deus.

## Rotas da API

| Método | Caminho | Parâmetros/corpo | Resultado |
|---|---|---|---|
| GET | `/filmes` | Query opcional `q` (busca por título) e `status` | Lista de filmes filtrada |
| GET | `/filmes/:id` | `id` numérico | Filme correspondente |
| GET | `/stats` | — | Total, contagem por status e média das notas |
| POST | `/filmes` | JSON com título, ano e demais campos | Filme criado |
| PUT | `/filmes/:id` | `id` numérico e JSON de alterações | Filme atualizado |
| DELETE | `/filmes/:id` | `id` numérico | Remove o filme |

As respostas de sucesso usam JSON, exceto a remoção, que não possui corpo.
Identificadores inexistentes retornam 404.
