import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ListMovies from "../components/tables/ListMovies"; // Caminho correto para seu componente

const queryClient = new QueryClient();

describe("ListMovies Component", () => {
  it("should render the title", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ListMovies />
      </QueryClientProvider>
    );

    // Verifica se o título "List Movies" é renderizado
    expect(screen.getByText(/list movies/i)).toBeInTheDocument();
  });

  it("should render the Year filter input and Winner filter", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ListMovies />
      </QueryClientProvider>
    );

    // Verifica se o campo de input para o ano  estão presentes
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
  });

  it("should render the Apply Filters button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ListMovies />
      </QueryClientProvider>
    );

    // Verifica se o botão de "Apply Filters" está presente
    expect(screen.getByText(/apply filters/i)).toBeInTheDocument();
  });
});
