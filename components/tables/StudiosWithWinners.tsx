import React, { useState, useCallback } from "react";
import {
  DataGrid,
  Column,
  Paging,
  Pager,
  DataGridTypes,
  Scrolling,
} from "devextreme-react/data-grid";
import { Paper } from "@mui/material";
import createDataGridColumns from "@/utils/createDataGridColumns";
import { studiosColumns } from "@/utils/typeGrid";
import InternalServices from "@/services/internalServices";
import { useQuery } from "react-query";
import SelectBox from "devextreme-react/select-box";
import CheckBox from "devextreme-react/check-box";

const displayModes = [
  { text: "Display Mode 'full'", value: "full" },
  { text: "Display Mode 'compact'", value: "compact" },
];
const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [
  5,
  10,
  "all",
];

const StudiosWithWinners = () => {
  const [displayMode, setDisplayMode] =
    useState<DataGridTypes.PagerDisplayMode>("full");
  const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showNavButtons, setShowNavButtons] = useState(true);

  const displayModeChange = useCallback((value) => {
    setDisplayMode(value);
  }, []);

  const showPageSizeSelectorChange = useCallback((value) => {
    setShowPageSizeSelector(value);
  }, []);

  const showInfoChange = useCallback((value) => {
    setShowInfo(value);
  }, []);

  const showNavButtonsChange = useCallback((value) => {
    setShowNavButtons(value);
  }, []);

  const isCompactMode = useCallback(
    () => displayMode === "compact",
    [displayMode]
  );

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
        className="shadow-md rounded-lg border border-gray-300 w-full"
        columnAutoWidth={true}
        columnResizingMode="widget"
        accessKey="false"
        columnWidth="auto"
      >
        <Scrolling rowRenderingMode="virtual"></Scrolling>
        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={displayMode}
          showPageSizeSelector={showPageSizeSelector}
          showInfo={showInfo}
          showNavigationButtons={showNavButtons}
        />

        <div className="mt-5 p-5 bg-gray-300/15 relative">
          <div className="text-lg font-medium">Options</div>
          <div className="flex flex-wrap gap-4">
            <div className="mt-3 flex items-center">
              <SelectBox
                id="displayModes"
                items={displayModes}
                displayExpr="text"
                valueExpr="value"
                value={displayMode}
                onValueChange={displayModeChange}
              />
            </div>
            <div className="mt-3 flex items-center">
              <CheckBox
                id="showPageSizes"
                text="Show Page Size Selector"
                value={showPageSizeSelector}
                onValueChange={showPageSizeSelectorChange}
              />
            </div>
            <div className="mt-3 flex items-center">
              <CheckBox
                id="showInfo"
                text="Show Info Text"
                value={showInfo}
                onValueChange={showInfoChange}
              />
            </div>
            <div className="mt-3 flex items-center">
              <CheckBox
                id="showNavButtons"
                text="Show Navigation Buttons"
                value={showNavButtons}
                onValueChange={showNavButtonsChange}
                disabled={isCompactMode()}
              />
            </div>
          </div>
        </div>

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
              headerCellRender={(args) => (
                <span className="font-semibold text-gray-700">
                  {args.column.caption}
                </span>
              )}
            />
          );
        })}
      </DataGrid>
    </Paper>
  );
};

export default StudiosWithWinners;
