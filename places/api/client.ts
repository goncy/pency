import fetch from "~/utils/fetch";

export default {
  search: (query: string) => fetch("GET", `/api/place?q=${window.encodeURIComponent(query)}`),
};
