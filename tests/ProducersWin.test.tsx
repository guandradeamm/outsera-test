import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProducersWin from "../components/tables/ProducersWin"; // Ajuste o caminho conforme necessário

const queryClient = new QueryClient();

describe("ProducersWin Component", () => {
  it("should render loading text when isLoading is true", () => {
    // Simula o estado de carregamento
    render(
      <QueryClientProvider client={queryClient}>
        <ProducersWin />
      </QueryClientProvider>
    );

    // Verifica se as mensagens de carregamento são exibidas
    const loadingMessages = screen.getAllByText(/loading/i);
    expect(loadingMessages.length).toBe(2); // Espera que ambas as mensagens de carregamento estejam presentes
  });

  it("should render error message when there is an error", () => {
    // Simula um erro na requisição
    render(
      <QueryClientProvider client={queryClient}>
        <ProducersWin />
      </QueryClientProvider>
    );

    // Verifica se a mensagem de erro é exibida
    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
  });
});
