import React, { useState } from "react";
import { DataGrid, Column, Paging } from "devextreme-react/data-grid";
import { useSearchParams } from "next/navigation";
import {
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useQuery } from "react-query";
import InternalServices from "@/services/internalServices";
import { listMoviesColumns } from "@/utils/typeGrid";
import createDataGridColumns from "@/utils/createDataGridColumns";

const ListMovies = () => {
  const searchParams = useSearchParams();

  // Obtendo os parâmetros da URL para inicializar os estados
  const pageQuery = Number(searchParams.get("page")) || 0;
  const pageSizeQuery = Number(searchParams.get("pageSize")) || 5;
  const yearQuery = Number(searchParams.get("year")) || 0;
  const winnerQuery = searchParams.get("winner") === "true";

  // Estados para os filtros e paginação
  const [pageSize, setPageSize] = useState<number>(pageSizeQuery);
  const [pageIndex, setPageIndex] = useState<number>(pageQuery);
  const [yearFilter, setYearFilter] = useState<number>(yearQuery);
  const [winnerFilter, setWinnerFilter] = useState<string>(
    winnerQuery ? "true" : "false"
  );
  const [tempYear, setTempYear] = useState<string>("");

  // Requisição para obter os dados
  const { data, isLoading, error } = useQuery(
    ["moviesData", pageIndex, pageSize, yearFilter, winnerFilter],
    () =>
      InternalServices.getFilmsData(
        pageIndex,
        pageSize,
        yearFilter,
        winnerFilter
      ),
    { keepPreviousData: true }
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading data.</p>;

  const handleSearch = () => {
    setYearFilter(parseInt(tempYear, 10));
    setPageIndex(0);
  };

  const winnersData = data?.data?.content || [];

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="list">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        List Movies
      </h2>
      <div className="mb-4 flex gap-4">
        <TextField
          label="Year"
          variant="outlined"
          value={tempYear}
          onChange={(e) => setTempYear(e.target.value)}
          className="w-full"
          type="number"
        />
        <FormControl variant="outlined" className="w-full">
          <InputLabel>Winner</InputLabel>
          <Select
            value={winnerFilter}
            onChange={(e) => setWinnerFilter(e.target.value)}
            label="Winner"
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <DataGrid
        dataSource={winnersData}
        showBorders={true}
        className="shadow-sm rounded-lg w-full"
        columnAutoWidth={true}
        columnWidth="auto"
        columnResizingMode="widget"
        keyExpr="id"
      >
        <Paging
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageIndexChange={setPageIndex}
          onPageSizeChange={setPageSize}
          defaultPageSize={pageSize}
          enabled={true}
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
      </DataGrid>
    </Paper>
  );
};

export default ListMovies;
