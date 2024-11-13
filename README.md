# Projeto: indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

> Descrição
> Este projeto implementa um dashboard interativo que exibe informações sobre filmes, estúdios e produtores que venceram prêmios. Utilizando React, Next.js, DevExtreme, Material UI e Cypress, o dashboard oferece diversas funcionalidades, como filtragem de dados, visualização de informações detalhadas, e acompanhamento de métricas.

**Tecnologias Utilizadas:**

- React.js - Framework JavaScript para construção de interfaces interativas.
- Next.js - Framework React para SSR (Server-Side Rendering) e SSG (Static Site Generation).
- Tailwind CSS - Framework CSS para design responsivo.
- DevExtreme - Conjunto de componentes de UI, incluindo o DataGrid, para exibição de dados.
- Material UI - Biblioteca de componentes React para design moderno e consistente.
- React Query - Biblioteca para gerenciamento de estados de dados assíncronos, como requisições HTTP.
- Cypress - Framework de testes de integração e E2E (End-to-End) para automatização de testes.

**Funcionalidades Implementadas**

1. Estúdios com Vencedores
   Exibe uma lista de estúdios que tiveram filmes vencedores de prêmios, utilizando o componente DataGrid do DevExtreme.
   O título da seção é dinâmico e mostra a quantidade de estúdios listados.
2. Produtores com Intervalo Máximo e Mínimo Entre Vitórias
   Exibe dois DataGrid: um para produtores com o maior intervalo entre vitórias e outro para os com o menor intervalo.
   Utiliza a requisição para obter os dados de um backend e renderizar as informações na tela.
3. Filmes por Ano
   Permite filtrar filmes de acordo com o ano digitado pelo usuário.
   Utiliza o componente TextField para captura do ano e o Button para iniciar a busca. Os resultados são exibidos no DataGrid.
4. Exibição de Animações e Carregamento de Dados
   Durante o carregamento, exibe mensagens e animações de carregamento para proporcionar uma melhor experiência ao usuário.
5. Responsividade
   Utiliza o Tailwind CSS para garantir que o layout seja responsivo e adaptável a diferentes tamanhos de tela.
6. Testes com Cypress
   Testes de UI: Verificam se os dados são corretamente carregados e exibidos no dashboard.
   Testes de Interação: Garantem que a filtragem por ano funcione corretamente.
   Testes de Carregamento: Validam se as mensagens de carregamento aparecem durante a obtenção de dados.
   Estrutura de Pastas
   A estrutura de pastas segue uma abordagem organizada, onde cada componente, serviço e teste é bem isolado para facilitar a manutenção.

. Depois de clonar o repositório, instale as dependencias:

- using npm:

```
npm install
```

- using yarn:

```
yarn
```

2. To run the application locally you can utilize the start script:

- using npm:

```
npm run start
```

- using yarn:

```
yarn start
```
