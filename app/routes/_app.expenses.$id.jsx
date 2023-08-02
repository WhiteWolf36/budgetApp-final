import { useNavigate } from "@remix-run/react";
import React from "react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { validateExpenseInput } from "../data/validation.server";
import { deleteExpense, updateExpense } from "../data/expense.server";
import { redirect } from "@remix-run/node";
//import { getExpense } from "../data/expense.server";
import { getMatchesData } from "@remix-run/v1-meta";

function UpdateExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    navigate("..");
  }
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// export async function loader({ params }) {
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ params, request }) {
  const expenseId = params.id;
  if (request.method === "POST") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);
    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }
    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    return redirect("/expenses");
  }
}

export default UpdateExpensesPage;
export function meta(args) {
  const matchesData = getMatchesData(args);
  const parentsData = matchesData["routes/_app.expenses"];
  const expense = parentsData.find((expense) => expense.id === args.params.id);
  return [
    { title: expense.title },
    { name: "description", content: "Update expense." },
  ];
}
