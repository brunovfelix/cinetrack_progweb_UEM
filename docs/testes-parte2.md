# Testes ponta a ponta da Parte 2

Os testes foram executados localmente com o Node portátil 22.16.0. O script
temporário executou `node seed.js`, iniciou `server.js` como processo filho,
fez as requisições com `fetch` nativo, reiniciou o servidor para verificar a
persistência e encerrou o processo no `finally`.

| Caso | Resultado observado |
|---|---|
| Carga do seed | 6 filmes canônicos gravados |
| `GET /filmes` e `GET /filmes/1` | 200; lista com 6 filmes e filme esperado |
| `POST /filmes` com campos inválidos | 400 com erros simultâneos para título, gênero, ano, nota e status |
| `POST /filmes` válido | 201; filme criado com `id` 7 |
| `PUT /filmes/7` válido | 200; campos atualizados e `id` original preservado |
| `PUT /filmes/7` com ano, nota e status inválidos | 400 com os três erros; registro permaneceu inalterado |
| GET, PUT e DELETE de filme inexistente | 404 em cada operação |
| Reinício do servidor após o cadastro | Filme atualizado continuou disponível por `GET /filmes/7` |
| `DELETE /filmes/7` | 204 sem corpo |

Ao final, `backend/data/filmes.json` foi restaurado byte a byte ao estado que
existia antes do teste (os nove registros originais).
