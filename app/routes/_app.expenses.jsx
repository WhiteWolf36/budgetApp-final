import { Link, Outlet, useLoaderData } from "@remix-run/react";

import ExpensesList from "~/components/expenses/ExpensesList";
import React from "react";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "../data/expense.server";
import { requireUserSession } from "../data/auth.server";
import { json } from "@remix-run/node";

function ExpensesLayout() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length !== 0;
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="/expenses/add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Download Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No Expense Found</h1>
            <p>
              Try <Link to="/expenses/add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  return json(expenses, {
    headers: {
      "Cache-Control": "max-age=3",
    },
  });
}

export default ExpensesLayout;
export function headers({ actionHeaders, loaderHeaders, parentHeaders }) {
  return {
    "Cache-Control": loaderHeaders.get("cache-control"),
  };
}
