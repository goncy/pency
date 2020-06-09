import * as R from "ramda";

import {ServerTenant} from "./types";

const cache = new Map<ServerTenant["slug"], ServerTenant>();

function update(slug: ServerTenant["slug"], value: Partial<ServerTenant>) {
  const cached: ServerTenant = cache.get(slug);

  cache.set(slug, R.mergeRight(cached, value));
}

function set(slug: ServerTenant["slug"], value: ServerTenant) {
  cache.set(slug, value);
}

function remove(slug: ServerTenant["slug"]) {
  cache.delete(slug);
}

function get(slug: ServerTenant["slug"]) {
  return cache.get(slug);
}

export default {
  get,
  set,
  update,
  remove,
};
