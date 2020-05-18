export function sortBy<T>(items: T[], selector: (item: T) => string | undefined) {
  return [...items].sort((a, b) => {
    const from = selector(a) || "";
    const to = selector(b) || "";

    return from.localeCompare(to);
  });
}

export function sort(items: string[]) {
  return [...items].sort((a, b) => a.localeCompare(b));
}
