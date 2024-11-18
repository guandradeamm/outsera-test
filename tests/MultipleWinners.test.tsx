import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import MultipleWinners from "../components/tables/MultipleWinners";

const queryClient = new QueryClient();

describe("MultipleWinners Component", () => {
  it("should render the title", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MultipleWinners />
      </QueryClientProvider>
    );

    // Verifica se o título "List years with multiple winners" é renderizado
    expect(
      screen.getByText(/list years with multiple winners/i)
    ).toBeInTheDocument();
  });

  it("should render loading text when data is being fetched", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MultipleWinners />
      </QueryClientProvider>
    );

    // Verifica se o texto "Loading..." é exibido enquanto os dados estão sendo carregados
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
