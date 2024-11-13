import React from "react";
import { DataGrid, Column } from "devextreme-react/data-grid";
import { Paper } from "@mui/material";
import createDataGridColumns from "@/utils/createDataGridColumns";
import { multipleColumns } from "@/utils/typeGrid";
import InternalServices from "@/services/internalServices";
import { useQuery } from "react-query";

const MultipleWinners = () => {
  // Requisição para obter os dados
  const { data, isLoading, error } = useQuery(
    "multipleWinners",
    InternalServices.getMultipleWinners
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading data.</p>;
  // Dados para as tabelas
  const multipleWinnersData = data?.data?.years;

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="dashboard">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        List years with multiple winners
      </h2>
      <DataGrid
        dataSource={multipleWinnersData}
        showBorders={true}
        className="shadow-sm rounded-lg border border-gray-200 w-full"
        columnAutoWidth={true}
        columnResizingMode="widget"
        accessKey="false"
        columnWidth="auto"
      >
        {multipleColumns.map((column) => {
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

export default MultipleWinners;
