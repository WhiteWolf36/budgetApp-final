import React from "react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import { getExpenses } from "../data/expense.server";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import Error from "../components/util/Error";
import { requireUserSession } from "../data/auth.server";

function ExpensesAnalysisPage() {
  const expensesData = useLoaderData();
  return (
    <main>
      <Chart expenses={expensesData} />
      <ExpenseStatistics expenses={expensesData} />
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      {
        message: "Hello",
      },
      { status: "404", statusText: "Not Found" }
    );
  }
  return expenses;
}

export default ExpensesAnalysisPage;

export function ErrorBoundary() {
  return (
    <Error>
      <h1>No Expense Found!</h1>
      <p>
        Try to <Link to="/expenses/add">add some</Link> today.
      </p>
    </Error>
  );
}
