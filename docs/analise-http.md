# Análise de tráfego HTTP

Inspeção realizada em 24 de novembro de 2026 usando o `fetch` nativo do Node.js
22 contra recursos públicos do MDN.

## Requisição inicial

| Método | URL | Status | Content-Type |
|---|---|---:|---|
| GET | `https://developer.mozilla.org/en-US/docs/Web/JavaScript` | 200 | `text/html` |

## Recursos estáticos

Os três recursos abaixo foram encontrados na resposta HTML e requisitados
separadamente com `fetch`.

| Recurso | URL | Status | Content-Type |
|---|---|---:|---|
| CSS | `https://developer.mozilla.org/static/client/styles-global.19cc0c980e463125.css` | 200 | `text/css` |
| JavaScript | `https://developer.mozilla.org/static/client/runtime.3d668166e9036abe.js` | 200 | `text/javascript` |
| Imagem SVG | `https://developer.mozilla.org/favicon.svg` | 200 | `image/svg+xml` |

## Resposta 404

Foi solicitado um caminho inexistente para provocar a resposta de erro:

| Método | URL | Status | Content-Type |
|---|---|---:|---|
| GET | `https://developer.mozilla.org/en-US/docs/Web/JavaScript/__cinetrack-anp-404-20261124__` | 404 | `text/html` |

O 200 indica que o recurso solicitado foi encontrado; o 404 indica que o
servidor recebeu e processou a solicitação, mas não encontrou esse caminho.

## Requisição Fetch/XHR e rotas do CineTrack

Uma busca do MDN foi requisitada com `fetch`, usando parâmetros na query string:

| Método | URL | Status | Content-Type |
|---|---|---:|---|
| GET | `https://developer.mozilla.org/api/v1/search?q=fetch&locale=en-US` | 200 | `application/json` |

Essa chamada tem o mesmo formato HTTP de `GET /filmes?status=assistido` na tabela
de rotas de [requisitos.md](requisitos.md): método GET e parâmetros na URL. A
busca consultada pertence à API do MDN, não à API do CineTrack.

Na aplicação, `GET /filmes` é a leitura da coleção: responde com a lista em JSON
e pode restringi-la pelo status. É a rota que o frontend usa para carregar os
filmes antes de aplicar a busca e os filtros na interface.
