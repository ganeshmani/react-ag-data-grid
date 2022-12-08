import { FunctionComponent, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import {
  mockTransactionData,
  mockTransactionDataColumns,
} from "../../utils/data";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
interface TableProps {}

const Table: FunctionComponent<TableProps> = () => {
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);
  return (
    <>
      <h2>AG Grid Implementation</h2>
      <div
        className="ag-theme-alpine"
        style={{
          height: "95%",
          width: "100%",
        }}
      >
        <AgGridReact
          rowData={mockTransactionData()}
          columnDefs={mockTransactionDataColumns()}
          defaultColDef={defaultColDef}
          pagination={true}
        ></AgGridReact>
      </div>
    </>
  );
};

export default Table;
