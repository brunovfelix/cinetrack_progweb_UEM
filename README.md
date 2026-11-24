# CineTrack

- Bruno Felix (RA 139175) e Cauã Karach (RA 140488)

Catálogo pessoal de filmes desenvolvido com HTML, CSS e JavaScript na Parte 1,
React no frontend e uma API Node.js/Express com persistência em arquivo JSON.
O catálogo inicial contém seis filmes e permite buscar, filtrar, cadastrar,
editar e remover títulos.

## Documentação

- [Requisitos do projeto](docs/requisitos.md)
- [Rotas da API](docs/api.md)
- [Testes ponta a ponta da Parte 2](docs/testes-parte2.md)

## Requisitos

- Node.js 20.6 ou superior (o backend usa `node --env-file`)

## Como rodar o backend

Em um terminal:

```bash
cd backend
npm install
cp .env.example .env          # Linux/macOS
# Copy-Item .env.example .env # Windows (PowerShell)
npm run dev
```

O backend usa a porta `3000`, definida em `backend/.env`.

## Como rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço exibido pelo Vite (por padrão, `http://localhost:5173`).

## Build do frontend

Dentro de `frontend/`, execute:

```bash
npm run build
```

## Parte 1

Abra `parte1/index.html` no navegador para usar a versão sem React.
