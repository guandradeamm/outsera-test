import React from "react";
import { DataGrid, Column } from "devextreme-react/data-grid"; // Importa o DataGrid e Column do DevExtreme para renderizar tabelas interativas.
import { Paper } from "@mui/material"; // Importa o componente Paper do Material UI para criar um painel com fundo branco.
import createDataGridColumns from "../../utils/createDataGridColumns"; // Função utilitária para criar colunas no DataGrid.
import { minColumns, maxColumns } from "../../utils/typeGrid"; // Importa a configuração das colunas de dados mínimos e máximos.
import InternalServices from "../../services/internalServices"; // Serviço para obter dados do backend.
import { useQuery } from "react-query"; // Hook do react-query para gerenciar o estado da requisição.

const ProducersWin = () => {
  // Realiza uma requisição para obter os dados de produtores com os maiores e menores intervalos entre vitórias.
  const { data, isLoading, error } = useQuery(
    "minMaxData", // Chave única para a query.
    InternalServices.getIntervalProducers // Função que faz a requisição para obter os dados.
  );
  console.log(data);
  // Extrai os dados de intervalo mínimo e máximo da resposta da requisição.
  const minData = data?.data?.min;
  const maxData = data?.data?.max;

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="dashboard">
      {/* Título principal da página */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Producers with longest and shortest interval between wins
      </h2>

      {/* Seção "Maximum" - Dados de maior intervalo entre vitórias */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">
        Maximum
      </h2>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p> // Exibe a mensagem de carregamento
      ) : error ? (
        <p className="text-center text-red-500">Error loading data.</p> // Exibe mensagem de erro se houver um erro
      ) : (
        <DataGrid
          dataSource={maxData} // Define o dataSource como os dados máximos
          showBorders={true} // Exibe bordas na tabela
          className="shadow-sm rounded-lg border border-gray-200 w-full" // Aplica estilos ao DataGrid
          columnAutoWidth={true} // Ajusta a largura das colunas automaticamente
          columnResizingMode="widget" // Permite redimensionamento das colunas
          accessKey="false" // Desabilita a funcionalidade de tecla de atalho (não utilizada)
        >
          {/* Mapeia as colunas máximas e cria os componentes Column no DataGrid */}
          {maxColumns.map((column) => {
            // Cria as colunas com as propriedades fornecidas pela função createDataGridColumns
            const { dataField, caption, visible, allowHiding, minWidth } =
              createDataGridColumns(column);

            return (
              <Column
                key={column} // Chave única para cada coluna
                dataField={dataField} // Define o campo de dados da coluna
                caption={caption} // Define o título da coluna
                alignment="center" // Alinha o conteúdo da coluna ao centro
                visible={visible} // Determina se a coluna será visível
                allowHiding={allowHiding} // Permite que a coluna seja escondida
                minWidth={minWidth} // Define a largura mínima da coluna
              />
            );
          })}
        </DataGrid>
      )}
      {/* Seção "Minimum" - Dados de menor intervalo entre vitórias */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">
        Minimum
      </h2>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p> // Exibe a mensagem de carregamento
      ) : error ? (
        <p className="text-center text-red-500">Error loading data.</p> // Exibe mensagem de erro se houver um erro
      ) : (
        <DataGrid
          dataSource={minData} // Define o dataSource como os dados mínimos
          showBorders={true} // Exibe bordas na tabela
          className="shadow-sm rounded-lg border border-gray-200 w-full" // Aplica estilos ao DataGrid
          columnAutoWidth={true} // Ajusta a largura das colunas automaticamente
          columnResizingMode="widget" // Permite redimensionamento das colunas
          accessKey="false" // Desabilita a funcionalidade de tecla de atalho (não utilizada)
          columnWidth="auto" // Define o tamanho automático das colunas
        >
          {/* Mapeia as colunas mínimas e cria os componentes Column no DataGrid */}
          {minColumns.map((column) => {
            // Cria as colunas com as propriedades fornecidas pela função createDataGridColumns
            const {
              dataField,
              caption,
              visible,
              allowHiding,
              minWidth,
              width,
            } = createDataGridColumns(column);

            return (
              <Column
                key={dataField} // Chave única para cada coluna
                dataField={dataField} // Define o campo de dados da coluna
                caption={caption} // Define o título da coluna
                alignment="center" // Alinha o conteúdo da coluna ao centro
                visible={visible} // Determina se a coluna será visível
                allowHiding={allowHiding} // Permite que a coluna seja escondida
                minWidth={minWidth} // Define a largura mínima da coluna
                width={width} // Define a largura fixa da coluna
              />
            );
          })}
        </DataGrid>
      )}
    </Paper>
  );
};

export default ProducersWin;
