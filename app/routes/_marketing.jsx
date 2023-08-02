import { Outlet } from "@remix-run/react";
import React from "react";
import sharedStyles from "~/styles/marketing.css";
import MainHeader from "../components/navigation/MainHeader";
import { getUserfromSession } from "../data/auth.server";
function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default MarketingLayout;

export function loader({ request }) {
  return getUserfromSession(request);
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export function headers() {
  return {
    "Cache-Control": "max-age=3600",
  };
}
