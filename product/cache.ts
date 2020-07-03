import produce from "immer";

import {Product} from "./types";
import schemas from "./schemas";

import {ClientTenant} from "~/tenant/types";

const cache = new Map<ClientTenant["id"], Product[]>();

function update(id: ClientTenant["id"], product: Product["id"], value: Partial<Product>) {
  // Get products from cache
  const cached: Product[] = get(id);

  // If we have cache and value
  if (cached && value) {
    // Get the index of the product to update
    const index = cached.findIndex((item) => item.id === product);

    // And if found
    if (index >= 0) {
      // Set it to cache
      set(
        id,
        produce(cached, (cached) => {
          cached[index] = {
            ...cached[index],
            ...value,
          };
        }),
      );
    } else {
      // Otherwise remove it from cache
      remove(id);
    }
  } else {
    // Otherwise remove it from cache
    remove(id);
  }
}

function set(id: ClientTenant["id"], value: Product[]) {
  // If the products are valid
  if (
    value &&
    Array.isArray(value) &&
    value.length &&
    value.every((product) => schemas.fetch.isValidSync(product))
  ) {
    // Set it on cache
    cache.set(id, value);
  } else {
    // Otherwise remove cache
    remove(id);
  }
}

function add(id: ClientTenant["id"], value: Product) {
  // Get cached value
  const cached: Product[] = get(id);

  // If there is cache
  if (cached) {
    // Add that product
    set(
      id,
      produce(cached, (cached) => {
        cached.push(value);
      }),
    );
  } else {
    // Otherwise remove it from cache
    remove(id);
  }
}

function pluck(id: ClientTenant["id"], product: Product["id"]) {
  // Get cached value
  const cached: Product[] = get(id);

  // If found
  if (cached) {
    // Get the index to remove
    const index = cached.findIndex((item) => item.id === product);

    // If an index was found
    if (index >= 0) {
      // Remove that index
      set(
        id,
        produce(cached, (cached) => {
          cached.splice(index, 1);
        }),
      );
    } else {
      // Otherwise remove it from cache
      remove(id);
    }
  } else {
    // Otherwise remove it from cache
    remove(id);
  }
}

function remove(id: ClientTenant["id"]) {
  // Remove cache for that id
  cache.delete(id);
}

function get(id: ClientTenant["id"]) {
  // We get the cached products
  const cached = cache.get(id);

  // If we have any
  if (cached) {
    // Return it
    return cached;
  } else {
    // If we don't have any valid cache, return undefined
    return undefined;
  }
}

function clear(): number {
  // Clear all the cache
  cache.clear();

  // Return cache size
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
