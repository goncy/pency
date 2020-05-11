export function groupBy<T>(items: T[], selector: (item: T) => string | undefined) {
  const groups = items.reduce<Record<string, T[]>>((acc, item) => {
    const key = selector(item) || "";

    acc[key] = acc[key] ? acc[key].concat(item) : [item];

    return acc;
  }, {});

  return Object.entries(groups).sort(([matcher]) => (!matcher ? -1 : 0));
}
