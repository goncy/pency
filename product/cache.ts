import * as R from "ramda";

import {Product} from "./types";

import {ClientTenant} from "~/tenant/types";

const cache = new Map<ClientTenant["id"], Product[]>();

function update(id: ClientTenant["id"], product: Product["id"], value: Partial<Product>) {
  const cached: Product[] = cache.get(id);
  const index = R.findIndex((item) => item.id === product, cached);

  cache.set(id, R.over(R.lensIndex(index), R.mergeLeft(value), cached));
}

function set(id: ClientTenant["id"], value: Product[]) {
  cache.set(id, value);
}

function add(id: ClientTenant["id"], value: Product) {
  const cached: Product[] = cache.get(id);

  cache.set(id, cached.concat(value));
}

function pluck(id: ClientTenant["id"], product: Product["id"]) {
  const cached: Product[] = cache.get(id);
  const index = R.findIndex((item) => item.id === product, cached);

  cache.set(id, R.remove(index, 1, cached));
}

function remove(id: ClientTenant["id"]) {
  cache.delete(id);
}

function get(id: ClientTenant["id"]) {
  return cache.get(id);
}

export default {
  add,
  get,
  set,
  pluck,
  update,
  remove,
};
