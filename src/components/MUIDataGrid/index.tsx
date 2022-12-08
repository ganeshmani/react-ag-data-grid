import {
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
  Fragment,
  CSSProperties,
} from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import ClockLoader from "react-spinners/ClockLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

interface MUIDataGridProps {}

const MUIDataGrid: FunctionComponent<MUIDataGridProps> = () => {
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [pageIndex, setPageIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAPIData = async ({ limit, skip, search }: any) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/companies?limit=${limit}&skip=${skip}&search=${search}`
      );
      const data = await response.json();
      console.log("data", data);

      const rows = data.data.map((item: any) => {
        return {
          id: item._id,
          price: item.price,
          shares: item.shares,
          ticker: item.ticker,
          ticket: item.ticket,
          time: moment(item.time).format("Do MMM YYYY"),
        };
      });

      setData(rows);
      setPageCount(data.paging.pages);
      setLoading(false);
    } catch (e) {
      console.log("Error while fetching", e);
      // setLoading(false)
    }
  };

  useEffect(() => {
    fetchAPIData({ limit: pageSize, skip: pageSize * pageIndex, search: "" });
  }, []);

  const columns: GridColDef[] = [
    { field: "price", headerName: "Price", flex: 1 },
    { field: "shares", headerName: "Shares", flex: 1 },
    { field: "ticker", headerName: "Ticker", flex: 1 },
    { field: "ticket", headerName: "Ticket", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
  ];

  const onPageChange = (newPage: number) => {
    console.log("newPage", newPage);
    setPageIndex(newPage);
    fetchAPIData({ limit: pageSize, skip: pageSize * newPage, search: "" });
  };
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
        <>
          <h2>MUI Data Grid</h2>
          <div className="container mx-auto flex flex-col h-full">
            <div className="flex justify-center mt-8 h-full">
              <DataGrid
                rows={data}
                columns={columns}
                pagination
                paginationMode={"server"}
                rowCount={pageCount}
                page={pageIndex}
                onPageChange={onPageChange}
                keepNonExistentRowsSelected
              />
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default MUIDataGrid;
