import produce from "immer";

import {
  parseServerTenant,
  formatClientTenant,
  parseClientTenant,
  formatServerTenant,
} from "../selectors";
import {DEFAULT_SERVER_TENANT, DEFAULT_CLIENT_TENANT} from "../constants";
import mock from "../mock";

describe("selectors", () => {
  describe("formatClientTenant", () => {
    it("should default to default tenant properties", () => {
      const base = produce(mock.client.full, (base) => {
        delete base.id;
      });
      const actual = produce(base, (actual) => {
        delete actual.banner;
        delete actual.phone;
        delete actual.color;
        delete actual.category;
      });
      const expected = {
        ...base,
        banner: DEFAULT_CLIENT_TENANT.banner,
        phone: DEFAULT_CLIENT_TENANT.phone,
        color: DEFAULT_CLIENT_TENANT.color,
        category: DEFAULT_CLIENT_TENANT.category,
      };

      expect(formatClientTenant(actual)).toMatchObject(expected);
    });

    describe("color", () => {
      it("should default a color", () => {
        const base = produce(mock.client.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.color;
        });
        const expected = {...base, color: DEFAULT_CLIENT_TENANT.color};

        expect(formatClientTenant(actual)).toMatchObject(expected);
      });
    });

    describe("phone", () => {
      it("should default a phone", () => {
        const base = produce(mock.client.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.phone;
        });
        const expected = {...base, phone: DEFAULT_CLIENT_TENANT.phone};

        expect(formatClientTenant(actual)).toMatchObject(expected);
      });
    });

    describe("keywords", () => {
      it("should default keywords", () => {
        const base = produce(mock.client.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.keywords;
        });
        const expected = {...base, keywords: DEFAULT_CLIENT_TENANT.keywords};

        expect(formatClientTenant(actual)).toMatchObject(expected);
      });
    });

    describe("fields", () => {
      it("should default fields", () => {
        const base = produce(mock.client.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.fields;
        });
        const expected = {...base, fields: DEFAULT_CLIENT_TENANT.fields};

        expect(formatClientTenant(actual)).toMatchObject(expected);
      });
    });

    describe("mercadopago", () => {
      it("should not have mercadopago", () => {
        const actual = mock.client.full;

        expect(formatClientTenant(actual)).not.toHaveProperty("mercadopago");
      });
    });
  });

  describe("formatServerTenant", () => {
    it("should default to default tenant properties", () => {
      const base = produce(mock.server.full, (base) => {
        delete base.id;
      });
      const actual = produce(base, (actual) => {
        delete actual.banner;
        delete actual.phone;
        delete actual.color;
        delete actual.category;
        delete actual.mercadopago;
      });
      const expected = {
        ...base,
        banner: DEFAULT_SERVER_TENANT.banner,
        phone: DEFAULT_SERVER_TENANT.phone,
        color: DEFAULT_SERVER_TENANT.color,
        category: DEFAULT_SERVER_TENANT.category,
        mercadopago: DEFAULT_SERVER_TENANT.mercadopago,
      };

      expect(formatServerTenant(actual)).toMatchObject(expected);
    });

    describe("color", () => {
      it("should default a color", () => {
        const base = produce(mock.server.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.color;
        });
        const expected = {...base, color: DEFAULT_SERVER_TENANT.color};

        expect(formatServerTenant(actual)).toMatchObject(expected);
      });
    });

    describe("phone", () => {
      it("should default a phone", () => {
        const base = produce(mock.server.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.phone;
        });
        const expected = {...base, phone: DEFAULT_SERVER_TENANT.phone};

        expect(formatServerTenant(actual)).toMatchObject(expected);
      });
    });

    describe("keywords", () => {
      it("should default keywords", () => {
        const base = produce(mock.server.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.keywords;
        });
        const expected = {...base, keywords: DEFAULT_SERVER_TENANT.keywords};

        expect(formatServerTenant(actual)).toMatchObject(expected);
      });
    });

    describe("fields", () => {
      it("should default fields", () => {
        const base = produce(mock.server.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.fields;
        });
        const expected = {...base, fields: DEFAULT_SERVER_TENANT.fields};

        expect(formatServerTenant(actual)).toMatchObject(expected);
      });
    });

    describe("mercadopago", () => {
      it("should default mercadopago", () => {
        const base = produce(mock.server.full, (base) => {
          delete base.id;
        });
        const actual = produce(base, (actual) => {
          delete actual.mercadopago;
        });
        const expected = {...base, mercadopago: DEFAULT_SERVER_TENANT.mercadopago};

        expect(formatServerTenant(actual)).toMatchObject(expected);
      });
    });
  });

  describe("parseServerTenant", () => {
    describe("id", () => {
      it("should return the same id passed", () => {
        const actual = {...mock.server.full, id: "some-id"};

        expect(parseServerTenant(actual)).toHaveProperty("id", "some-id");
      });
    });
  });

  describe("parseClientTenant", () => {
    describe("id", () => {
      it("should return the same id passed", () => {
        const actual = {...mock.client.full, id: "some-id"};

        expect(parseClientTenant(actual)).toHaveProperty("id", "some-id");
      });
    });
  });
});
