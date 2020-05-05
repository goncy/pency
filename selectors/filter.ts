export function filterBy<T>(items: T[], filters: Partial<Record<keyof T, T[keyof T]>>) {
  const matchers = Object.entries(filters);

  return items.filter((item) =>
    matchers.every(([property, matcher]) => {
      if (!matcher) return true;

      const value = item[property as keyof T];

      return typeof value === "string"
        ? value.toLocaleLowerCase().includes(String(matcher).toLocaleLowerCase())
        : value === matcher;
    }),
  );
}

export function extractUniqueBy<T, K>(items: T[], selector: (item: T) => K) {
  return Array.from(new Set(items.map(selector)));
}
