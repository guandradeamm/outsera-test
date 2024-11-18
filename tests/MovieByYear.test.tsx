import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import MovieByYear from "../components/tables/MovieByYear"; // Caminho correto para seu componente

const queryClient = new QueryClient();

describe("MovieByYear Component", () => {
  it("should render the title", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MovieByYear />
      </QueryClientProvider>
    );

    // Verifica se o título "List movie winners by year" é renderizado
    expect(screen.getByText(/list movie winners by year/i)).toBeInTheDocument();
  });

  it("should render the input field and search button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MovieByYear />
      </QueryClientProvider>
    );

    // Verifica se o campo de input para o ano e o botão de busca estão presentes
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
});
