import {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useMemo,
  useRef,
  FunctionComponent,
  CSSProperties,
} from "react";
import {
  DataEditor,
  GridColumn,
  GridCellKind,
  Item,
  GridCell,
  AutoGridColumn,
} from "@glideapps/glide-data-grid";
import ClockLoader from "react-spinners/ClockLoader";

import "@glideapps/glide-data-grid/dist/index.css";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const GlideDataGrid: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any>([]);
  const columns: GridColumn[] = [
    { id: "price", title: "Price", width: 200 },
    { id: "shares", title: "Shares", width: 200 },
    { id: "ticker", title: "Ticker", width: 200 },
    { id: "ticket", title: "Ticket", width: 200 },
    { id: "time", title: "Time", width: 200 },
  ];

  const fetchAPIData = async ({ limit, skip, search }: any) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/companies?limit=${limit}&skip=${skip}&search=${search}`
      );
      const data = await response.json();

      setData(data.data);

      setLoading(false);
    } catch (e) {
      console.log("Error while fetching", e);
      // setLoading(false)
    }
  };

  useEffect(() => {
    fetchAPIData({ limit: 200, skip: 0, search: "" });
  }, []);

  function getData([col, row]: Item): GridCell {
    switch (col) {
      case 0:
        return {
          kind: GridCellKind.Text,
          data: data[row].price ? data[row].price.toString() : "",
          allowOverlay: false,
          displayData: data[row].price ? data[row].price.toString() : "",
        };

      case 1:
        return {
          kind: GridCellKind.Text,
          data: data[row].shares ? data[row].shares.toString() : "",
          allowOverlay: false,
          displayData: data[row].shares ? data[row].shares.toString() : "",
        };

      case 2:
        return {
          kind: GridCellKind.Text,
          data: data[row].ticker ? data[row].ticker.toString() : "",
          allowOverlay: false,
          displayData: data[row].ticker ? data[row].ticker.toString() : "",
        };

      case 3:
        return {
          kind: GridCellKind.Text,
          data: data[row].ticket ? data[row].ticket.toString() : "",
          allowOverlay: false,
          displayData: data[row].ticket ? data[row].ticket.toString() : "",
        };

      case 4:
        return {
          kind: GridCellKind.Text,
          data: data[row].time ? data[row].time.toString() : "",
          allowOverlay: false,
          displayData: data[row].time ? data[row].time.toString() : "",
        };

      default:
        return {
          kind: GridCellKind.Text,
          data: "",
          allowOverlay: false,
          displayData: "",
        };
    }
  }

  return (
    <Fragment>
      <div className="py-2">
        <h1>Glide Data Grid</h1>
      </div>
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
        <div className="w-full">
          <DataEditor
            getCellContent={getData}
            columns={columns}
            rows={data.length}
            width={1000}
            getCellsForSelection={true}
            keybindings={{ search: true }}
          />
        </div>
      )}
    </Fragment>
  );
};

export default GlideDataGrid;
