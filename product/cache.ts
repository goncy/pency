import produce from "immer";

import {Product} from "./types";
import schemas from "./schemas";

import reporter from "~/reporting";
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

      // Report it to sentry
      reporter.message(`Found cache for products but not for id on ${id} [UPDATE]`, {
        origin: `product_cache`,
        extras: {
          value,
          cached,
        },
      });
    }
  } else {
    // Otherwise remove it from cache
    remove(id);
  }
}

function set(id: ClientTenant["id"], value: Product[]) {
  // If we have products
  if (value && Array.isArray(value) && value.length) {
    // And all products are valid
    if (value.every((product) => schemas.client.fetch.isValidSync(product))) {
      // Set it on cache
      cache.set(id, value);
    } else {
      // Otherwise remove cache
      remove(id);

      // Report it to sentry
      reporter.message(`Trying to save invalid cache for ${id} [SET]`, {
        origin: `product_cache`,
        extras: {
          value,
          cached: cache.get(id),
        },
      });
    }
  } else {
    // Otherwise remove cache
    remove(id);
  }
}

function add(id: ClientTenant["id"], value: Product) {
  // Get cached value
  const cached: Product[] = get(id);

  // If there is cache
  if (cached && value) {
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
  if (cached && product) {
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

      // Report it to sentry
      reporter.message(`Found cache for products but not for id on ${id} [PLUCK]`, {
        origin: `product_cache`,
        extras: {
          id,
          cached,
        },
      });
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
