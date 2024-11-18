import React, { useState } from "react";
import { DataGrid, Column } from "devextreme-react/data-grid"; // Importando o DataGrid e a coluna para exibir dados em forma de tabela.
import { Paper, TextField, Button } from "@mui/material"; // Importando componentes do Material UI para estrutura e interatividade.
import createDataGridColumns from "../../utils/createDataGridColumns"; // Função utilitária para gerar colunas dinamicamente.
import InternalServices from "../../services/internalServices"; // Serviço para fazer requisições HTTP.
import { useQuery } from "react-query"; // Hook para gerenciamento de dados assíncronos e cache de resultados.
import { movieByYearColumns } from "../../utils/typeGrid"; // Definição de colunas para o DataGrid.

const MovieByYear = () => {
  // Estados para controlar o ano temporário (input) e o ano filtrado para a consulta.
  const [tempYear, setTempYear] = useState(""); // Estado para armazenar o valor temporário inserido no campo de input.
  const [year, setYear] = useState<number>(0); // Estado para armazenar o valor do ano a ser usado na consulta.

  // Requisição para obter os dados do ano específico utilizando o React Query
  const { data, isLoading, error } = useQuery(
    ["yearFilteredData", year], // Chave única para a consulta, dependente do ano selecionado.
    () => InternalServices.getFilmYear(year), // Função que faz a requisição para o serviço, passando o ano como parâmetro.
    { enabled: !!year } // Habilita a consulta somente se o ano for válido (diferente de 0).
  );

  // Função para lidar com a mudança no campo de input (ano) e atualizar o estado do ano.
  const handleYearChange = () => {
    const value = parseInt(tempYear, 10); // Converte o valor do input para um número inteiro.
    setYear(value); // Atualiza o estado do ano.
  };

  // Dados a serem passados para o DataGrid (tabela)
  const dataGridData = data?.data || []; // Utiliza os dados da resposta ou um array vazio caso não haja dados.

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg">
      {" "}
      {/* Papel de fundo com estilo */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        {" "}
        {/* Título centralizado */}
        List movie winners by year
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()} // Previne o comportamento padrão do formulário (recarregar a página).
        className="flex items-center space-x-4"
      >
        {/* Campo de input para o ano */}
        <TextField
          label="Year" // Rótulo do campo
          variant="outlined" // Tipo de borda do campo
          value={tempYear} // Valor controlado do campo de input
          onChange={(e) => setTempYear(e?.target?.value)} // Atualiza o estado do valor temporário ao digitar no campo
          className="w-40" // Estilo de largura para o campo
          type="number" // Tipo numérico para garantir apenas números no campo
        />
        {/* Botão de busca */}
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleYearChange} // Chama a função de alteração do ano ao clicar no botão
        >
          Search
        </Button>
      </form>
      {/* DataGrid para exibir os dados em formato tabular */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p> // Exibe a mensagem de carregamento
      ) : error ? (
        <p className="text-center text-red-500">Error loading data.</p> // Exibe mensagem de erro se houver um erro
      ) : (
        <DataGrid
          dataSource={dataGridData} // Passa os dados para o DataGrid
          showBorders={true} // Exibe bordas para as células
          className="shadow-sm rounded-lg border border-gray-200 w-full" // Estilo de borda e largura
          columnAutoWidth={true} // Ajusta automaticamente a largura das colunas
          columnResizingMode="widget" // Habilita o redimensionamento das colunas
          rowAlternationEnabled={true} // Habilita alternância de cor entre as linhas
        >
          {/* Mapeia as colunas a partir da configuração em movieByYearColumns */}
          {movieByYearColumns.map((column) => {
            const {
              dataField,
              caption,

              visible,
              allowHiding,
              minWidth,
              width,
            } = createDataGridColumns(column); // Cria dinamicamente as colunas utilizando a função de utilitário
            return (
              <Column
                key={dataField}
                dataField={dataField} // Define o campo de dados da coluna
                caption={caption} // Define o título da coluna
                visible={visible} // Controla se a coluna será visível
                allowHiding={allowHiding} // Permite esconder a coluna
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

export default MovieByYear;
