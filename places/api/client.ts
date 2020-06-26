import fetch from "~/utils/fetch";

export default {
  search: (query: string, region: string) =>
    fetch("GET", `/api/place?query=${window.encodeURIComponent(query)}&region=${region}`),
};
