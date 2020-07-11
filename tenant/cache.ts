import {ServerTenant} from "./types";
import schemas from "./schemas";

import reporter from "~/reporting";

const cache = new Map<ServerTenant["slug"], ServerTenant>();

function update(slug: ServerTenant["slug"], value: Partial<ServerTenant>) {
  // We get the cached tenant
  const cached: ServerTenant = get(slug);

  // If we have any
  if (cached && value) {
    // We set it on cache
    set(slug, {...cached, ...value});
  } else {
    // Otherwise remove cache
    remove(slug);
  }
}

function set(slug: ServerTenant["slug"], value: ServerTenant) {
  // If the tenant is valid
  if (value && schemas.server.fetch.isValidSync(value)) {
    // Set it on cache
    cache.set(slug, value);
  } else {
    // Otherwise remove cache
    remove(slug);

    // Report it to sentry
    reporter.message(`Trying to save invalid cache for ${slug}`, {
      origin: `tenant_cache`,
      extras: {
        value,
        cached: cache.get(slug),
      },
    });
  }
}

function remove(slug: ServerTenant["slug"]) {
  // Remove cache for slug
  cache.delete(slug);
}

function get(slug: ServerTenant["slug"]) {
  // We get the cached tenant
  const cached = cache.get(slug);

  // If we have any
  if (cached) {
    // Return it
    return cached;
  } else {
    // And return undefined
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
