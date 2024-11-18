// Definindo a interface para a estrutura das colunas
interface ColumnConfig {
  dataField: string;
  visible: boolean;
  caption: string;
  allowHiding: boolean;
  minWidth: number;
  width: string;
}

// Definindo as colunas do DataGrid
export const allColumns = {
  Date: {
    dataField: "year",
    visible: true,
    caption: "Year",
    allowHiding: false,
    minWidth: 150,
    width: "auto",
  },
  Count: {
    dataField: "winnerCount",
    visible: true,
    caption: "Win Count",
    allowHiding: false,
    width: "auto",
    minWidth: 150,
  },
  Name: {
    dataField: "name",
    visible: true,
    caption: "Name",
    allowHiding: false,
    minWidth: 150,
    width: "auto",
  },
  WinCount: {
    dataField: "winCount",
    visible: true,
    caption: "Win Count",
    allowHiding: false,
    minWidth: 150,
    width: "auto",
  },
  Producer: {
    dataField: "producer",
    visible: true,
    caption: "Producer",
    allowHiding: false,
    width: "auto",
    minWidth: 150,
  },
  Interval: {
    dataField: "interval",
    visible: true,
    caption: "Interval",
    allowHiding: false,
    width: "auto",
    minWidth: 150,
  },
  PreviousWin: {
    dataField: "previousWin",
    visible: true,
    caption: "Previous Year",
    allowHiding: false,
    width: "auto",
    minWidth: 150,
  },
  FollowingWin: {
    dataField: "followingWin",
    visible: true,
    caption: "Following Year",
    allowHiding: false,
    width: "auto",
    minWidth: 150,
  },
  ID: {
    dataField: "id",
    visible: true,
    caption: "ID",
    allowHiding: false,
    width: "auto",
    minWidth: 150,
  },
  Year: {
    dataField: "year",
    visible: true,
    caption: "Year",
    allowHiding: false,
    minWidth: 150,
    width: "auto",
  },
  Title: {
    dataField: "title",
    visible: true,
    caption: "Title",
    allowHiding: false,
    width: "auto",
    minWidth: 150,
  },
};

// Função para acessar as colunas
const createDataGridColumns = (
  column: keyof typeof allColumns
): ColumnConfig => {
  // Retorna a coluna específica do objeto allColumns
  return allColumns[column];
};

export default createDataGridColumns;
