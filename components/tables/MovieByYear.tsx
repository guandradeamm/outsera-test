import React, { useState } from "react";
import { DataGrid, Column } from "devextreme-react/data-grid";
import { Paper, TextField, Button } from "@mui/material";
import createDataGridColumns from "@/utils/createDataGridColumns";
import InternalServices from "@/services/internalServices";
import { useQuery } from "react-query";
import { movieByYearColumns } from "@/utils/typeGrid";

const MovieByYear = () => {
  // Estados para campos de busca
  const [tempYear, setTempYear] = useState("");
  const [year, setYear] = useState<number>(0);

  // Requisição para obter os dados
  const { data, isLoading, error } = useQuery(
    ["yearFilteredData", year],
    () => InternalServices.getFilmYear(year),
    { enabled: !!year }
  );

  // Handler para o campo de input do ano
  const handleYearChange = () => {
    const value = parseInt(tempYear, 10);
    setYear(value);
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading data.</p>;

  // Dados para as tabelas
  const dataGridData = data?.data || [];

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Filtered Data by Year
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center space-x-4"
      >
        <TextField
          label="Year"
          variant="outlined"
          value={tempYear}
          onChange={(e) => setTempYear(e?.target?.value)}
          className="w-40"
          type="number"
        />
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={handleYearChange}
        >
          Search
        </Button>
      </form>

      <DataGrid
        dataSource={dataGridData}
        showBorders={true}
        className="shadow-sm rounded-lg border border-gray-200 w-full"
        columnAutoWidth={true}
        columnResizingMode="widget"
        rowAlternationEnabled={true}
      >
        {movieByYearColumns.map((column) => {
          const {
            dataField,
            caption,
            alignment,
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
              alignment={alignment}
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

export default MovieByYear;
