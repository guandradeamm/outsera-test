"use client";

import ListMovies from "@/components/tables/ListMovies";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function ListPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="relative flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={navItems} />
          <div className="grid gap-4  mt-24">
            <ListMovies />
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
}
