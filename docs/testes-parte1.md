# Testes da Parte 1

Validação manual no navegador integrado em 24 de novembro de 2026. A página foi
aberta pelo arquivo local `parte1/index.html`; a chave `cinetrack:filmes` foi
limpa antes do teste e restaurada ao final.

| Caso | Ação | Resultado |
|---|---|---|
| Adicionar válido | Cadastrar “Filme de teste ANP06”, ano 2025, gênero Drama e nota 3 | Passou: catálogo aumentou de 6 para 7 |
| Ano inválido | Tentar salvar um filme com ano 1887 | Passou: validação do campo bloqueou o envio e o catálogo não mudou |
| Editar | Alterar o título de “A Origem” | Passou: o novo título foi renderizado |
| Cancelar remoção | Dispensar a confirmação ao remover “Parasita” | Passou: o filme permaneceu no catálogo |
| Busca e filtro | Buscar “Duna” com status “Assistindo” | Passou: apenas “Duna: Parte Dois” foi exibido |
| Reload/localStorage | Recarregar depois de cadastrar o filme temporário | Passou: os sete filmes foram restaurados |
| Esc/Cancelar do modal | Fechar o modal com Escape e com o botão Cancelar | Passou: ambos fecharam o modal |
| Carga canônica | Limpar a persistência e recarregar a página | Passou: os seis filmes canônicos foram carregados |

Verificação adicional: a ordenação por título exibiu os filmes em ordem
alfabética sem alterar o catálogo persistido.
