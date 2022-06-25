import React from "react";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";

import { MdCampaign, MdBolt, MdIntegrationInstructions } from "react-icons/md";

const ROUTES = [
  {
    path: "/",
    Icon: MdIntegrationInstructions,
    title: "Integration",
  },
  {
    path: "/campaigns",
    Icon: MdCampaign,
    title: "Campaigns",
  },
  {
    path: "/triggers",
    Icon: MdBolt,
    title: "Triggers",
  },
];

const Dashboard = () => {
  const location = useLocation();
  console.log(location);
  const { app_id } = useParams();
  return (
    <section className="flex min-h-screen">
      {/* Navbar */}
      <aside className="flex flex-col font-semibold bg-primary-700 text-white">
        <nav className="mt-40 flex flex-col">
          {ROUTES.map((route) => (
            <Link
              key={route.path}
              to={`/dashboard/${app_id}${route.path}`}
              className={`cursor-pointer pr-6 pl-4 py-4 flex items-center gap-2 leading-none filter ${
                location.pathname === `/dashboard/${app_id}${route.path}`
                  ? "bg-primary-300"
                  : " hover:brightness-110 bg-primary-700"
              } `}
            >
              <route.Icon size={24} />
              {route.title}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Header */}
      <Outlet />
    </section>
  );
};

export default Dashboard;
