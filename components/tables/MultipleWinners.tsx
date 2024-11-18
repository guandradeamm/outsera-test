import React from "react";
import { DataGrid, Column } from "devextreme-react/data-grid"; // Importação do componente DataGrid e Column da biblioteca DevExtreme
import { Paper } from "@mui/material"; // Importação do componente Paper do Material UI
import createDataGridColumns from "../../utils/createDataGridColumns"; // Função utilitária para criar colunas do DataGrid
import { multipleColumns } from "../../utils/typeGrid"; // Importação das colunas definidas previamente
import InternalServices from "../../services/internalServices"; // Importação de funções de serviços internos para obter dados
import { useQuery } from "react-query"; // Hook da react-query para obter dados de forma assíncrona

const MultipleWinners = () => {
  // Requisição para obter os dados, com o nome da query 'multipleWinners' e o método 'getMultipleWinners' do InternalServices
  const { data, isLoading, error } = useQuery(
    "multipleWinners", // Nome da query
    InternalServices.getMultipleWinners // Função que faz a requisição para buscar os dados
  );

  // Extrai os dados necessários para a tabela a partir da resposta da requisição (assumindo que a resposta tem a estrutura 'data.data.years')
  const multipleWinnersData = data?.data?.years;

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="dashboard">
      {/* Título da página */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        List years with multiple winners
      </h2>

      {/* Condicional para exibir o carregamento ou mensagem de erro */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p> // Exibe a mensagem "Loading..." enquanto os dados estão sendo carregados
      ) : error ? (
        <p className="text-center text-red-500">Error loading data.</p> // Exibe a mensagem "Error loading data." se ocorrer um erro na requisição
      ) : (
        // Exibe o DataGrid com os dados carregados, caso não haja erro e o carregamento tenha terminado
        <DataGrid
          dataSource={multipleWinnersData} // Fonte de dados para o DataGrid
          showBorders={true} // Exibe bordas ao redor das células da tabela
          className="shadow-sm rounded-lg border border-gray-200 w-full" // Classes do Tailwind CSS para estilo da tabela
          columnAutoWidth={true} // Ajuste automático da largura das colunas
          columnResizingMode="widget" // Permite o redimensionamento das colunas
          accessKey="false" // Define a chave de acesso, aqui desabilitada
          columnWidth="auto" // Largura das colunas ajustada automaticamente
        >
          {/* Mapeia as colunas definidas em 'multipleColumns' e cria as colunas dinamicamente */}
          {multipleColumns.map((column) => {
            const {
              dataField,
              caption, // Nome que aparece na coluna
              visible,
              allowHiding,
              minWidth,
              width,
            } = createDataGridColumns(column); // Cria as propriedades das colunas usando a função utilitária

            return (
              <Column
                key={dataField} // Chave única para cada coluna
                dataField={dataField} // Define o campo de dados da coluna
                caption={caption} // Define o título da coluna
                alignment="center" // Alinha o conteúdo das células ao centro
                visible={visible} // Controla se a coluna é visível
                allowHiding={allowHiding} // Permite ou não esconder a coluna
                minWidth={minWidth} // Define a largura mínima da coluna
                width={width} // Define a largura da coluna
              />
            );
          })}
        </DataGrid>
      )}
    </Paper>
  );
};

export default MultipleWinners; // Exporta o componente para ser utilizado em outros lugares
