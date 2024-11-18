"use client"; // Indica que este componente será executado no cliente, ou seja, no navegador.

import MovieByYear from "@/components/tables/MovieByYear"; // Importa o componente MovieByYear, que provavelmente exibe dados de filmes por ano.
import MultipleWinners from "@/components/tables/MultipleWinners"; // Importa o componente MultipleWinners, que provavelmente exibe dados sobre múltiplos vencedores.
import ProducersWin from "@/components/tables/ProducersWin"; // Importa o componente ProducersWin, que provavelmente exibe dados sobre produtores e suas vitórias.
import StudiosWithWinners from "@/components/tables/StudiosWithWinners"; // Importa o componente StudiosWithWinners, que provavelmente exibe dados sobre estúdios e vencedores.
import { FloatingNav } from "@/components/ui/FloatingNav"; // Importa o componente FloatingNav para exibir uma barra de navegação flutuante.
import { navItems } from "@/data"; // Importa os itens de navegação, que são usados na barra de navegação.
import { QueryClient, QueryClientProvider } from "react-query"; // Importa QueryClient e QueryClientProvider do React Query, que gerenciam o estado das requisições de dados.

const queryClient = new QueryClient(); // Cria uma instância do QueryClient, que gerencia o cache e as requisições de dados.

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Provedor que torna o cliente do React Query disponível para todos os componentes filhos */}
      <main className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
        {" "}
        {/* Layout centralizado e responsivo com Tailwind CSS */}
        <div className="max-w-7xl w-full">
          {" "}
          {/* Define a largura máxima do container */}
          <FloatingNav navItems={navItems} />{" "}
          {/* Renderiza o componente de navegação flutuante com os itens de navegação */}
          <div className="grid gap-4 sm:gap-6 xl:grid-cols-2 mt-24">
            {" "}
            {/* Organiza os componentes em uma grid responsiva */}
            {/* Renderiza os componentes de tabelas que exibem dados diferentes */}
            <MultipleWinners />
            <StudiosWithWinners />
            <ProducersWin />
            <MovieByYear />
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
