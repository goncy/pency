import unfetch from "isomorphic-unfetch";

export default function fetch(
  method: "GET" | "PATCH" | "POST" | "DELETE",
  path: string,
  body: Record<string, any> = null,
) {
  return unfetch(`${process.env.BASE_URL}/api${path}`, {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: process.browser ? window.localStorage.getItem("token") : null,
    },
    body: ["PATCH", "POST"].includes(method) && body ? JSON.stringify(body) : null,
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}
