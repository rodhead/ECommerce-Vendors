import { IColumns } from "./IColumns";

export interface ITable {
  headers: Array<IColumns>;
  rows: any;
  totalCount: number;
  pageSize: number;
  pageIndex: number;
  url?: string;
}
