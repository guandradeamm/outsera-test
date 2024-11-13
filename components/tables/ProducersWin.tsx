import React from "react";
import { DataGrid, Column } from "devextreme-react/data-grid";
import { Paper } from "@mui/material";
import createDataGridColumns from "@/utils/createDataGridColumns";
import { minColumns, maxColumns } from "@/utils/typeGrid";
import InternalServices from "@/services/internalServices";
import { useQuery } from "react-query";

const ProducersWin = () => {
  // Requisição para obter os dados
  const { data, isLoading, error } = useQuery(
    "minMaxData",
    InternalServices.getIntervalProducers
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading data.</p>;

  // Dados para as tabelas
  const minData = data?.data?.min;
  const maxData = data?.data?.max;

  return (
    <Paper className="bg-white p-6 rounded-lg shadow-lg" id="dashboard">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Producers with longest and shortest interval between wins
      </h2>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">
        Maximum
      </h2>
      <DataGrid
        dataSource={maxData}
        showBorders={true}
        className="shadow-sm rounded-lg border border-gray-200 w-full"
        columnAutoWidth={true}
        columnResizingMode="widget"
        accessKey="false"
      >
        {maxColumns.map((column) => {
          const {
            dataField,
            caption,

            visible,
            allowHiding,
            minWidth,
          } = createDataGridColumns(column);

          return (
            <Column
              key={column}
              dataField={dataField}
              caption={caption}
              alignment="center"
              visible={visible}
              allowHiding={allowHiding}
              minWidth={minWidth}
            />
          );
        })}
      </DataGrid>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left">
        Minimum
      </h2>
      <DataGrid
        dataSource={minData}
        showBorders={true}
        className="shadow-sm rounded-lg border border-gray-200 w-full"
        columnAutoWidth={true}
        columnResizingMode="widget"
        accessKey="false"
        columnWidth="auto"
      >
        {minColumns.map((column) => {
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

export default ProducersWin;
