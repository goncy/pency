import produce from "immer";

import {Product} from "./types";

import {ClientTenant} from "~/tenant/types";

const cache = new Map<ClientTenant["id"], Product[]>();

function update(id: ClientTenant["id"], product: Product["id"], value: Partial<Product>) {
  const cached: Product[] = cache.get(id);

  if (cached) {
    const index = cached.findIndex((item) => item.id === product);

    if (index >= 0) {
      cache.set(
        id,
        produce(cached, (cached) => {
          cached[index] = {
            ...cached[index],
            ...value,
          };
        }),
      );
    }
  }
}

function set(id: ClientTenant["id"], value: Product[]) {
  cache.set(id, value);
}

function add(id: ClientTenant["id"], value: Product) {
  const cached: Product[] = cache.get(id);

  if (cached) {
    cache.set(id, cached.concat(value));
  }
}

function pluck(id: ClientTenant["id"], product: Product["id"]) {
  const cached: Product[] = cache.get(id);

  if (cached) {
    const index = cached.findIndex((item) => item.id === product);

    if (index >= 0) {
      cache.set(
        id,
        produce(cached, (cached) => {
          delete cached[index];
        }),
      );
    }
  }
}

function remove(id: ClientTenant["id"]) {
  cache.delete(id);
}

function get(id: ClientTenant["id"]) {
  return cache.get(id);
}

function clear(): number {
  cache.clear();

  return cache.size;
}

export default {
  add,
  get,
  set,
  clear,
  pluck,
  update,
  remove,
};
