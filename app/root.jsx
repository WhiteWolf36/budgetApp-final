import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  Link,
  useMatches,
} from "@remix-run/react";
import sharedStyles from "~/styles/shared.css";
import Error from "~/components/util/Error";

export function Document({ title, children }) {
  const disableJS = useMatches().some((match) => match.handle?.disableJS);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}
export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Document title={error.statusText}>
      <main>
        <Error title={error.statusText}>
          <p>
            {error.data?.message ||
              error?.data ||
              "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to={"/"}>safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export const meta = () => {
  return [
    { title: "BudgetApp" },
    { name: "description", content: "Manage your expenses with ease." },
  ];
};
