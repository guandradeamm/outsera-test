import { allColumns } from "./createDataGridColumns";

// Tipando as colunas com as chaves de allColumns
export const multipleColumns: (keyof typeof allColumns)[] = ["Date", "Count"];
export const studiosColumns: (keyof typeof allColumns)[] = ["Name", "WinCount"];
export const minColumns: (keyof typeof allColumns)[] = [
  "Producer",
  "Interval",
  "PreviousWin",
  "FollowingWin",
];
export const maxColumns: (keyof typeof allColumns)[] = [
  "Producer",
  "Interval",
  "PreviousWin",
  "FollowingWin",
];
export const movieByYearColumns: (keyof typeof allColumns)[] = [
  "ID",
  "Year",
  "Title",
];
export const listMoviesColumns: (keyof typeof allColumns)[] = [
  "ID",
  "Year",
  "Title",
];
