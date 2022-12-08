import { FunctionComponent } from "react";
import { Outlet, Link } from "react-router-dom";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <h1>AG Grid - Guides and Alternatives</h1>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <h1 className="text-xl p-4">AG Grid</h1>

              <header className="flex items-center justify-center leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <Link to={"/ag-grid"}>
                    <a className="no-underline hover:underline text-black">
                      Demo
                    </a>
                  </Link>
                </h1>
              </header>
            </article>
          </div>

          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <h1 className="text-xl p-4">React Table</h1>

              <header className="flex items-center justify-center leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <Link to={"/react-table"}>
                    <a className="no-underline hover:underline text-black">
                      Demo
                    </a>
                  </Link>
                </h1>
              </header>
            </article>
          </div>

          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <h1 className="text-xl p-4">Glide Data Grid</h1>

              <header className="flex items-center justify-center leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <Link to={"/glide-data-grid"}>
                    <a className="no-underline hover:underline text-black">
                      Demo
                    </a>
                  </Link>
                </h1>
              </header>
            </article>
          </div>

          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg shadow-lg">
              <h1 className="text-xl p-4">MUI Data Grid</h1>

              <header className="flex items-center justify-center leading-tight p-2 md:p-4">
                <h1 className="text-lg">
                  <Link to={"/mui-data-grid"}>
                    <a className="no-underline hover:underline text-black">
                      Demo
                    </a>
                  </Link>
                </h1>
              </header>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
