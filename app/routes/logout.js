import { destroyUserSession } from "~/data/auth.server.js";
export function action({ request }) {
  if (request.method !== "POST") {
    throw new Error("Invalid Response!!");
  }
  return destroyUserSession(request);
}
