"use client";

import ListMovies from "@/components/tables/ListMovies";
import MovieByYear from "@/components/tables/MovieByYear";
import MultipleWinners from "@/components/tables/MultipleWinners";
import ProducersWin from "@/components/tables/ProducersWin";
import StudiosWithWinners from "@/components/tables/StudiosWithWinners";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={navItems} />

          <div className="grid gap-4 sm:gap-6 xl:grid-cols-2  mt-24">
            <MultipleWinners />
            <StudiosWithWinners />
            <ProducersWin />
            <MovieByYear />
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-0 mt-24 ">
            <ListMovies />
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
