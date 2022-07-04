import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

import {
  MdCampaign,
  MdBolt,
  MdIntegrationInstructions,
  MdArrowLeft,
} from "react-icons/md";
import { Logo } from "./";

const ROUTES = [
  {
    path: "",
    Icon: MdIntegrationInstructions,
    title: "Integration",
  },
  {
    path: "campaigns",
    Icon: MdCampaign,
    title: "Campaigns",
  },
  {
    path: "triggers",
    Icon: MdBolt,
    title: "Triggers",
  },
];

const Dashboard = () => {
  const location = useLocation();

  return (
    <section className="flex min-h-screen">
      {/* Navbar */}
      <aside className="flex flex-col font-semibold bg-primary-700 text-white">
        <div className="font-bold py-12 px-4 text-center">
          <Logo className="w-full h-auto" />
        </div>
        <nav className="mt-6 flex flex-col">
          <Link
            to="/dashboard"
            className={`whitespace-nowrap cursor-pointer pr-6 pl-4 py-4 flex items-center gap-2 leading-none filter hover:brightness-110 bg-primary-700`}
          >
            {/* <route.Icon size={24} /> */}
            <MdArrowLeft size={24} />
            All Projects
          </Link>
          {ROUTES.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `whitespace-nowrap cursor-pointer pr-6 pl-4 py-4 flex items-center gap-2 leading-none filter ${
                  isActive
                    ? "bg-primary-300"
                    : " hover:brightness-110 bg-primary-700"
                } `
              }
              end
            >
              <route.Icon size={24} />
              {route.title}
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Header */}
      <Outlet />
    </section>
  );
};

export default Dashboard;
