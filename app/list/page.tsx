"use client"; // Direciona que este componente será executado no cliente (browser) em vez do servidor.

import ListMovies from "@/components/tables/ListMovies"; // Importa o componente ListMovies para ser renderizado nesta página.
import { FloatingNav } from "@/components/ui/FloatingNav"; // Importa o componente FloatingNav para navegação flutuante.
import { navItems } from "@/data"; // Importa os itens de navegação, provavelmente um array de objetos com informações sobre os itens do menu.
import { QueryClient, QueryClientProvider } from "react-query"; // Importa o QueryClient e QueryClientProvider do React Query para gerenciar o estado da requisição de dados.

const queryClient = new QueryClient(); // Cria uma nova instância do cliente de query do React Query, que gerenciará o cache das requisições de dados.

export default function ListPage() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Provedor que torna o client do React Query disponível para todos os componentes filhos */}
      <main className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
        {" "}
        {/* Layout centralizado com classes do Tailwind CSS */}
        <div className="max-w-7xl w-full">
          {" "}
          {/* Limita a largura máxima do container */}
          <FloatingNav navItems={navItems} />{" "}
          {/* Renderiza a navegação flutuante passando os itens de navegação */}
          <div className="grid gap-4 mt-24">
            {" "}
            {/* Grid que organiza os componentes abaixo */}
            <ListMovies />{" "}
            {/* Renderiza o componente ListMovies, que provavelmente exibe uma lista de filmes */}
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
