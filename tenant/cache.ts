const cache = new Map();

export default {
  get: (key) => cache.get(key),
  set: (key, value) => cache.set(key, value),
  del: (key) => cache.delete(key),
};
