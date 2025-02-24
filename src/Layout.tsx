import { Link, Outlet, useLocation } from "react-router";
import LOGO from "./assets/logo.svg";
import Breadcrumb from "./components/Breadcrumb";

export default function Layout() {
  const location = useLocation();

  return (
    <main>
      <div className="p-3 w-full flex justify-between">
        <img className="h-8" src={LOGO} alt="ASTUDIO" />
        <div className="flex gap-2 items-center">
          <Link
            className={location.pathname == "/" ? "font-bold" : "font-normal"}
            to="/"
          >
            Products
          </Link>
          <Link
            className={
              location.pathname == "/users" ? "font-bold" : "font-normal"
            }
            to="/users"
          >
            Users
          </Link>
        </div>
      </div>
      <Breadcrumb />
      <Outlet />
    </main>
  );
}
