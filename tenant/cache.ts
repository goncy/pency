import {ServerTenant} from "./types";
import schemas from "./schemas";

const cache = new Map<ServerTenant["slug"], ServerTenant>();

function update(slug: ServerTenant["slug"], value: Partial<ServerTenant>) {
  // We get the cached tenant
  const cached: ServerTenant = cache.get(slug);

  // If we have any
  if (cached) {
    // We get the temporary result
    const result = {...cached, ...value};

    // If that temp value is valid
    if (schemas.server.fetch.isValidSync(result)) {
      // We store it on cache
      cache.set(slug, {...cached, ...value});
    } else {
      // Otherwise clean cache for that slug
      remove(slug);
    }
  }
}

function set(slug: ServerTenant["slug"], value: ServerTenant) {
  // If the tenant is valid
  if (value && schemas.server.fetch.isValidSync(value)) {
    // Set it on cache
    cache.set(slug, value);
  }
}

function remove(slug: ServerTenant["slug"]) {
  cache.delete(slug);
}

function get(slug: ServerTenant["slug"]) {
  // We get the cached tenant
  const cached = cache.get(slug);

  // If we have any
  if (cached) {
    // And its valid
    if (schemas.server.fetch.isValidSync(cached)) {
      // Returh the cached value
      console.log(`Returning ${slug} from cache`);
      return cached;
    } else {
      console.log(`Removing cache for ${slug}`);

      // Otherwise remove cache for that slug
      remove(slug);

      // And return undefined
      return undefined;
    }
  } else {
    console.log(`No cache found for ${slug}`);

    // If we don't have any valid cache, return undefined
    return undefined;
  }
}

function clear(): number {
  // Clear everything from cache
  cache.clear();

  // Return its size
  return cache.size;
}

export default {
  get,
  set,
  update,
  remove,
  clear,
};
