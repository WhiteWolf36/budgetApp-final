import { requireUserSession } from "../data/auth.server";
import { getExpenses } from "../data/expense.server";

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  return getExpenses(userId);
}
