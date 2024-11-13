import React from "react";
import { DataGrid, Column } from "devextreme-react/data-grid";
import { Paper } from "@mui/material";
import createDataGridColumns from "@/utils/createDataGridColumns";
import { studiosColumns } from "@/utils/typeGrid";
import InternalServices from "@/services/internalServices";
import { useQuery } from "react-query";

const StudiosWithWinners = () => {
  // Requisição para obter os dados
  const { data, isLoading, error } = useQuery(
    "Studios",
    InternalServices.getStudios
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading data.</p>;

  // Dados para as tabelas
  const studiosWinnersData = data?.data?.studios;
  // Titulo dinamico de acordo com a quantidade
  const studiosCount = studiosWinnersData?.length || 0;

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="dashboard">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top {studiosCount} studios with winners
      </h2>
      <DataGrid
        dataSource={studiosWinnersData}
        showBorders={true}
        className="shadow-sm rounded-lg border border-gray-200 w-full"
        columnAutoWidth={true}
        columnResizingMode="widget"
        accessKey="false"
        columnWidth="auto"
      >
        {studiosColumns.map((column) => {
          const { dataField, caption, visible, allowHiding, minWidth, width } =
            createDataGridColumns(column);
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

export default StudiosWithWinners;
