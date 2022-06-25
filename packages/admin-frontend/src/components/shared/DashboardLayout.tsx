import React from "react";
import { Link, Outlet, useLocation, useMatch } from "react-router-dom";

import { MdCampaign, MdBolt } from "react-icons/md";

const ROUTES = [
  {
    path: "/dashboard/campaigns",
    Icon: MdCampaign,
    title: "Campaigns",
  },
  {
    path: "/dashboard/triggers",
    Icon: MdBolt,
    title: "Triggers",
  },
];

const Dashboard = () => {
  const location = useLocation();
  const isRoot = useMatch("/dashboard");

  return (
    <section className="flex min-h-screen">
      {/* Navbar */}
      {!isRoot && (
        <aside className="flex flex-col font-semibold bg-primary-700 text-white">
          <nav className="mt-40 flex flex-col">
            {ROUTES.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`cursor-pointer pr-6 pl-4 py-4 flex items-center gap-2 leading-none filter ${
                  location.pathname === route.path
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
      )}
      {/* Header */}
      <Outlet />
    </section>
  );
};

export default Dashboard;
