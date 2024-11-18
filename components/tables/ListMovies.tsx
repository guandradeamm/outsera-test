"use client";
import React, { useState } from "react";
import {
  DataGrid,
  Column,
  Paging,
  Scrolling,
  Pager,
} from "devextreme-react/data-grid"; // Importação dos componentes do DataGrid da DevExtreme
import { useSearchParams } from "next/navigation"; // Hook para acessar parâmetros da URL no Next.js
import {
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material"; // Componentes do Material UI para inputs e botões
import { useQuery } from "react-query"; // Hook para requisições assíncronas com React Query
import InternalServices from "../../services/internalServices"; // Serviço que faz a requisição para a API
import { listMoviesColumns } from "../../utils/typeGrid"; // Dados das colunas da tabela
import createDataGridColumns from "../../utils/createDataGridColumns"; // Função para criar as colunas do DataGrid

const ListMovies = () => {
  const searchParams = useSearchParams(); // Obtendo os parâmetros da URL

  // Obtendo os parâmetros da URL para inicializar os estados
  const pageQuery = Number(searchParams?.get("page")) || 0; // Página inicial (padrão: 0)
  const pageSizeQuery = Number(searchParams?.get("pageSize")) || 5; // Tamanho da página (padrão: 5)
  const yearQuery = Number(searchParams?.get("year")) || 2018; // Filtro de ano (padrão: 2018)
  const winnerQuery = searchParams?.get("winner") || ""; // Filtro de vencedor (não passar parâmetro inicialmente)

  // Estados para os filtros e paginação
  const [pageSize, setPageSize] = useState<number>(pageSizeQuery); // Tamanho da página
  const [pageIndex, setPageIndex] = useState<number>(pageQuery); // Índice da página
  const [yearFilter, setYearFilter] = useState<number>(yearQuery); // Filtro de ano
  const [winnerFilter, setWinnerFilter] = useState<string>(winnerQuery); // Filtro de vencedor

  // Requisição para obter os dados dos filmes
  const { data, isLoading, error } = useQuery(
    ["moviesData", pageIndex, pageSize, yearFilter, winnerFilter], // Chave única para a requisição
    () =>
      InternalServices.getFilmsData(
        // Função que retorna os dados da API
        pageIndex,
        pageSize,
        yearFilter,
        winnerFilter // Aqui passa o filtro winner apenas se foi modificado
      ),
    { keepPreviousData: true } // Mantém os dados anteriores enquanto os novos estão sendo carregados
  );

  const handleSearch = () => {
    // Monta o objeto de parâmetros, garantindo que `year` nunca seja undefined
    const params: Record<string, string | number> = {
      page: 0, // Reseta para a primeira página
      pageSize,
      year: yearFilter ?? "", // Ou um valor padrão, como uma string vazia ou 0
    };

    // Se o filtro de vencedor não for vazio, adiciona à URL
    if (winnerFilter) {
      params["winner"] = winnerFilter;
    }

    // Lógica para atualizar a URL
  };

  // Filtrando os dados com base no filtro de vencedor
  const filteredData =
    winnerFilter === ""
      ? data?.data?.content // Se não houver filtro de winner, traz todos os dados
      : data?.data?.content?.filter(
          (movie) =>
            (winnerFilter === "true" && movie.winner) || // Filtra filmes vencedores
            (winnerFilter === "false" && !movie.winner) // Filtra filmes não vencedores
        );

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="list">
      {/* Título da página */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        List Movies
      </h2>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Filtro por Ano */}
        <TextField
          label="Year"
          variant="outlined"
          value={yearFilter || ""} // Valor do filtro de ano
          onChange={(e) => setYearFilter(Number(e.target.value) || 0)} // Atualiza o filtro de ano
          className="flex-1"
          type="number" // Tipo de campo para número
        />

        {/* Filtro por Winner */}
        <FormControl variant="outlined" className="flex-1">
          <FormControl>
            <InputLabel>Winner</InputLabel>
            <Select
              value={winnerFilter || ""} // Se winnerFilter for undefined ou null, exibe o valor padrão ("")
              onChange={(e) => setWinnerFilter(e.target.value)} // Atualiza o filtro de vencedor
              label="Winner"
            >
              <MenuItem value="">Yes/No</MenuItem> {/* Opção para todos */}
              <MenuItem value="true">Yes</MenuItem>{" "}
              {/* Opção para filmes vencedores */}
              <MenuItem value="false">No</MenuItem>{" "}
              {/* Opção para filmes não vencedores */}
            </Select>
          </FormControl>
        </FormControl>

        {/* Botão para aplicar filtros */}
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Apply Filters
        </Button>
      </div>

      {/* DataGrid para exibir os filmes */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p> // Exibe a mensagem de carregamento
      ) : error ? (
        <p className="text-center text-red-500">Error loading data.</p> // Exibe mensagem de erro se houver um erro
      ) : (
        <DataGrid
          id="grid list movies"
          dataSource={filteredData || []} // Dados a serem exibidos na tabela
          showBorders={true} // Exibe bordas na tabela
          className="shadow-sm rounded-lg w-full"
          columnAutoWidth={true} // Ajuste automático da largura das colunas
          columnWidth="auto"
          columnResizingMode="widget" // Permite redimensionar as colunas
          keyExpr="id" // A chave única de cada linha
        >
          <Scrolling mode="virtual" />
          <Paging
            pageIndex={pageIndex} // Página atual
            pageSize={pageSize} // Tamanho da página
            onPageIndexChange={setPageIndex} // Atualiza o índice da página
            onPageSizeChange={setPageSize} // Atualiza o tamanho da página
            defaultPageSize={pageSize} // Tamanho padrão da página
            enabled={true} // Habilita a paginação
          />
          <Pager
            visible={true} // Torna o pager visível
            showPageSizeSelector={true} // Exibe a seleção do tamanho da página
            allowedPageSizes={[5, 10, 20, 50]} // Tamanhos de página permitidos
            showInfo={true} // Exibe informações de paginação
            displayMode="full" // Exibe todas as informações
          />
          {listMoviesColumns.map((column) => {
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
                key={dataField}
                dataField={dataField}
                caption={caption}
                alignment="center"
                visible={visible}
                allowHiding={allowHiding}
                minWidth={minWidth}
                width={width}
              />
            );
          })}
          <Column
            dataField="winner"
            caption="Winner"
            alignment="center"
            visible={true}
            allowHiding={true}
            minWidth={100}
            cellRender={(data) => (data.value ? "Yes" : "No")}
          />
        </DataGrid>
      )}
    </Paper>
  );
};

export default ListMovies;
