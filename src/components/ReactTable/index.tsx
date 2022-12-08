import React, {
  Fragment,
  useEffect,
  useMemo,
  useState,
  FunctionComponent,
  CSSProperties,
} from "react";
import { useTable, usePagination, useExpanded, useSortBy } from "react-table";
import ClockLoader from "react-spinners/ClockLoader";
import {
  Pagination,
  PagincationButtonContainer,
  PaginationButton,
  PaginationIndex,
  RightIconSpan,
  LeftIconSpan,
  NextButtonIcon,
  BackButtonIcon,
} from "./index.style";

interface TableProps {
  columns: any;
  data: any;
  fetchData: any;
  pageCount: number;
  loading: boolean;
  isPaginated?: boolean;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ReactTable: FunctionComponent<TableProps> = ({
  columns,
  data,
  fetchData,
  pageCount: controlledPageCount,
  loading,
  isPaginated = true,
  ...props
}) => {
  const defaultColumn = useMemo(
    () => ({
      // minWidth: 20,
      // maxWidth: 115
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: 15,
        hiddenColumns: columns
          .filter((column: any) => !column.show)
          .map((column: any) => column.id),
      },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: controlledPageCount,
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  React.useEffect(() => {
    fetchData && fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);
  return (
    <Fragment>
      {loading ? (
        <div>
          {" "}
          <ClockLoader
            color={"#000000"}
            loading={loading}
            cssOverride={override}
            size={150}
          />
        </div>
      ) : (
        <div className="flex flex-col w-full">
          <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow sm:rounded-lg border-b border-gray-200"></div>
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody
                className="bg-white divide-y divide-gray-200"
                {...getTableBodyProps()}
              >
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {Boolean(isPaginated) && (
              <Pagination>
                <PaginationIndex>
                  page {pageIndex + 1} of {pageOptions.length}
                </PaginationIndex>{" "}
                <PagincationButtonContainer>
                  {canPreviousPage ? (
                    <PaginationButton onClick={() => previousPage()}>
                      <LeftIconSpan>
                        <BackButtonIcon />
                      </LeftIconSpan>
                      Back
                    </PaginationButton>
                  ) : null}
                  {canNextPage ? (
                    <PaginationButton onClick={() => nextPage()}>
                      Next{" "}
                      <RightIconSpan>
                        <NextButtonIcon />
                      </RightIconSpan>
                    </PaginationButton>
                  ) : null}
                </PagincationButtonContainer>
              </Pagination>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ReactTable;
