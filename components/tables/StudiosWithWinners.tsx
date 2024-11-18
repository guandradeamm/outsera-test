import React from "react";
import { DataGrid, Column, Scrolling } from "devextreme-react/data-grid"; // Componentes do DevExtreme para criar e manipular grids de dados
import { Paper } from "@mui/material"; // Componente Paper do Material UI para estilizar a área do componente
import createDataGridColumns from "@/utils/createDataGridColumns"; // Função para criar as colunas do DataGrid
import { studiosColumns } from "@/utils/typeGrid"; // Definindo as colunas a serem usadas no DataGrid
import InternalServices from "@/services/internalServices"; // Serviço para realizar requisições à API
import { useQuery } from "react-query"; // Hook do React Query para gerenciamento de requisições assíncronas

// Função de componente para exibir os estúdios com os melhores vencedores
const StudiosWithTopWinners = () => {
  // Realiza a requisição para obter os dados dos estúdios
  const { data, isLoading, error } = useQuery(
    "Studios", // Chave da query que o React Query usará para armazenar e acessar os dados
    InternalServices.getStudios // Função que faz a requisição para obter os dados dos estúdios
  );

  // Ordena os estúdios com base no número de vitórias e pega os top 3
  const studiosWinnersData = data?.data?.studios
    ?.sort((a, b) => b.winCount - a.winCount) // Ordena em ordem decrescente pelo campo winCount
    ?.slice(0, 3); // Pega apenas os 3 primeiros estúdios

  return (
    // Container Paper para estilizar a área do componente
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="dashboard">
      {/* Título que exibe a quantidade de estúdios com base nos dados */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top {studiosWinnersData?.length || 0} Studios with winners
      </h2>

      {/* DataGrid para exibir os dados dos estúdios */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p> // Exibe a mensagem de carregamento
      ) : error ? (
        <p className="text-center text-red-500">Error loading data.</p> // Exibe mensagem de erro se houver um erro
      ) : (
        <DataGrid
          dataSource={studiosWinnersData} // Passando os dados para o DataGrid
          showBorders={true} // Exibe as bordas da tabela
          className="shadow-md rounded-lg border border-gray-300 w-full" // Estilos aplicados à tabela
          columnAutoWidth={true} // Ajusta automaticamente a largura das colunas
          columnResizingMode="widget" // Permite redimensionamento das colunas
        >
          {/* Scrolling virtual para otimizar a performance com grandes conjuntos de dados */}
          <Scrolling mode="virtual" />

          {/* Mapeia as colunas definidas no arquivo 'studiosColumns' */}
          {studiosColumns.map((column) => {
            // Chama a função para criar as colunas com base nas configurações
            const {
              dataField,
              caption,
              visible,
              allowHiding,
              minWidth,
              width,
            } = createDataGridColumns(column);

            return (
              // Cria cada coluna dentro do DataGrid
              <Column
                key={dataField} // Chave única para cada coluna
                dataField={dataField} // Nome do campo que será exibido na coluna
                caption={caption} // Título da coluna
                alignment="center" // Alinha o conteúdo da coluna ao centro
                visible={visible} // Determina se a coluna será visível ou não
                allowHiding={allowHiding} // Permite que a coluna seja escondida
                minWidth={minWidth} // Largura mínima da coluna
                width={width} // Largura definida da coluna
                headerCellRender={(args) => (
                  // Customiza o render do cabeçalho da coluna
                  <span className="font-semibold text-gray-700">
                    {args.column.caption} {/* Exibe o título da coluna */}
                  </span>
                )}
              />
            );
          })}
        </DataGrid>
      )}
    </Paper>
  );
};

export default StudiosWithTopWinners; // Exporta o componente para ser usado em outros lugares
