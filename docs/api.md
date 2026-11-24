# API do CineTrack

A API usa JSON nas respostas, exceto nas remoções bem-sucedidas, que retornam
`204 No Content`. Os campos obrigatórios de um filme são `titulo`, `ano`,
`genero`, `nota` e `status`; `poster` e `comentario` são opcionais. A nota deve
ser um número inteiro de 1 a 5, o ano deve estar entre 1888 e 2030, e o status
deve ser `assistido`, `assistindo` ou `quero`.

| Método | Caminho | Parâmetros/corpo | Status |
|---|---|---|---|
| GET | `/filmes` | Query opcional `q` (busca por título) e `status` | 200 |
| GET | `/filmes/:id` | `id` numérico | 200, 404 |
| GET | `/stats` | — | 200 |
| POST | `/filmes` | JSON com os campos obrigatórios e, opcionalmente, pôster e comentário | 201, 400 |
| PUT | `/filmes/:id` | `id` numérico e JSON com os campos a atualizar | 200, 400, 404 |
| DELETE | `/filmes/:id` | `id` numérico | 204, 404 |

As buscas em `q` não diferenciam maiúsculas de minúsculas e podem ser
combinadas com o filtro `status`. A rota `/stats` retorna o total de filmes,
uma contagem por status e a média das notas com uma casa decimal.

As respostas `400` contêm `{ "erros": [...] }`. Os `404` identificam um filme
inexistente.
