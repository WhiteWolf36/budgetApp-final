import { Outlet } from "@remix-run/react";
import React from "react";
import sharedStyles from "~/styles/expenses.css";
import ExpensesHeader from "../components/navigation/ExpensesHeader";

function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export default ExpensesAppLayout;

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
