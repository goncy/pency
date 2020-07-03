import cache from "../cache";
import mock from "../mock";

describe("Product cache", () => {
  afterEach(() => {
    cache.clear();
  });

  describe("add", () => {
    it("should add product to a list", () => {
      const base = mock.full;
      const products = [mock.full, mock.full];

      cache.set("tenant", products);
      cache.add("tenant", base);

      expect(cache.get("tenant")).toContain(base);
    });
  });

  describe("get", () => {
    it("should get a list of products for a tenant", () => {
      const products = [mock.full, mock.full];

      cache.set("tenant", products);

      expect(cache.get("tenant")).toEqual(products);
    });
  });

  describe("set", () => {
    it("should set a list of products", () => {
      const products = [mock.full, mock.full];

      cache.set("tenant", products);

      expect(cache.get("tenant")).toEqual(products);
    });
  });

  describe("clear", () => {
    it("should clear cache", () => {
      cache.set("1", [mock.full]);
      cache.set("2", [mock.full]);
      cache.set("3", [mock.full]);

      expect(cache.clear()).toEqual(0);
    });
  });

  describe("pluck", () => {
    it("should remove a product", () => {
      const base = mock.full;
      const products = [mock.full, base, mock.full];

      cache.set("tenant", products);
      cache.pluck("tenant", base.id);

      expect(cache.get("tenant")).not.toContain(base);
    });

    it("should return undefined when id is not found", () => {
      const base = mock.full;
      const products = [mock.full, base, mock.full];
      const expected = undefined;

      cache.set("tenant", products);
      cache.pluck("tenant", "non-existent-id");

      expect(cache.get("tenant")).toEqual(expected);
    });
  });

  describe("update", () => {
    it("should update a partial product", () => {
      const base = mock.full;
      const partial = {
        title: "some modified title",
      };
      const expected = {
        ...base,
        ...partial,
      };

      cache.set("tenant", [mock.full, base, mock.full]);
      cache.update("tenant", base.id, partial);

      expect(cache.get("tenant")[1]).toEqual(expected);
    });

    it("should clear cache when id is not found", () => {
      const base = mock.full;
      const partial = {
        title: "some modified title",
      };
      const expected = undefined;

      cache.set("tenant", [mock.full, base, mock.full]);
      cache.update("tenant", "inexistent-id", partial);

      expect(cache.get("tenant")).toEqual(expected);
    });

    it("should not update when cache is empty", () => {
      const base = mock.full;
      const partial = {
        title: "some modified title",
      };
      const expected = undefined;

      cache.update("tenant", base.id, partial);

      expect(cache.get("tenant")).toEqual(expected);
    });
  });

  describe("remove", () => {
    it("should remove a list of products", () => {
      const products = [mock.full, mock.full];

      cache.set("tenant", products);
      cache.remove("tenant");

      expect(cache.get("tenant")).toEqual(undefined);
    });

    it("passes when removing inexistent id", () => {
      const expected = undefined;

      cache.remove("inexistent-id");

      expect(cache.get("inexistent-id")).toEqual(expected);
    });
  });
});
