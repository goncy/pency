import unfetch from "isomorphic-unfetch";

import reporter from "~/reporting";

export default function fetch(
  method: "GET" | "PATCH" | "POST" | "DELETE" | "PUT",
  path: string,
  body: Record<string, any> = null,
  headers: Record<string, any> = {},
) {
  return unfetch(path, {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: process.browser ? window.localStorage.getItem("token") : null,
      ...headers,
    },
    body: ["PATCH", "POST", "PUT"].includes(method) && body ? JSON.stringify(body) : null,
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .catch((error) => {
      // Report fetch failure
      reporter.report(error, {
        origin: `fetch_util`,
        extras: {
          method,
          path,
          body,
          headers,
        },
      });

      // Rethrow promise
      return Promise.reject(error);
    });
}
