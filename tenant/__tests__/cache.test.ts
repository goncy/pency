import cache from "../cache";
import mock from "../mock";

describe("Tenant cache", () => {
  afterEach(() => {
    cache.clear();
  });

  describe("update", () => {
    it("should update a partial tenant", () => {
      const base = mock.server.full;
      const partial = {
        title: "some title",
        fields: [],
      };
      const expected = {
        ...base,
        ...partial,
      };

      cache.set(base.slug, base);
      cache.update(base.slug, partial);

      expect(cache.get(base.slug)).toEqual(expected);
    });
  });

  describe("set", () => {
    it("should set a tenant", () => {
      const tenant = mock.server.full;

      cache.set(tenant.slug, tenant);

      expect(cache.get(tenant.slug)).toEqual(tenant);
    });
  });

  describe("remove", () => {
    it("should remove a tenant", () => {
      const tenant = mock.server.full;

      cache.set("first", tenant);
      cache.set("second", mock.server.full);
      cache.remove("first");

      expect(cache.get(tenant.slug)).toEqual(undefined);
    });
  });

  describe("get", () => {
    it("should get a tenant", () => {
      const tenant = mock.server.full;

      cache.set(tenant.slug, tenant);

      expect(cache.get(tenant.slug)).toEqual(tenant);
    });

    it("should get undefined if tenant is not valid", () => {
      const tenant = mock.server.full;

      cache.set(tenant.slug, {title: tenant.title} as any);

      expect(cache.get(tenant.slug)).toEqual(undefined);
    });

    it("should get undefined if tenant is partial", () => {
      const {title, slug, phone} = mock.server.full;

      cache.set(slug, {title, slug, phone} as any);

      expect(cache.get(slug)).toEqual(undefined);
    });

    it("should get undefined if tenant is partial with id", () => {
      const {title, slug, phone, id} = mock.server.full;

      cache.set(slug, {title, slug, phone, id} as any);

      expect(cache.get(slug)).toEqual(undefined);
    });

    it("should return tenant if required fields are present", () => {
      const {title, color, slug, phone, id} = mock.server.full;

      cache.set(slug, {title, slug, color, phone, id});

      expect(cache.get(slug)).toEqual({title, color, slug, phone, id});
    });
  });

  describe("clear", () => {
    it("should clear cache", () => {
      cache.set("1", mock.server.full);
      cache.set("2", mock.server.full);
      cache.set("3", mock.server.full);

      expect(cache.clear()).toEqual(0);
    });
  });
});
