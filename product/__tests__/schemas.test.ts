import produce from "immer";

import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_VARIANT, DEFAULT_PRODUCT_OPTION} from "../constants";
import mock from "../mock";
import {Product} from "../types";
import schemas from "../schemas";

describe("schemas", () => {
  describe("server", () => {
    describe("create", () => {
      it("should default product default properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.description;
          delete actual.category;
          delete actual.image;
          delete actual.featured;
        });
        const expected = produce(actual, (expected) => {
          delete expected.id;

          expected.description = DEFAULT_PRODUCT.description;
          expected.category = DEFAULT_PRODUCT.category;
          expected.image = DEFAULT_PRODUCT.image;
          expected.featured = DEFAULT_PRODUCT.featured;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });

      it("should remove id", () => {
        const actual = mock.withoutVariantsValue;
        const expected = produce(actual, (expected) => {
          delete expected.id;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant options properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].options[0].title;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].options[0].title = DEFAULT_PRODUCT_OPTION.title;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });
    });

    describe("update", () => {
      it("should return base properties untouched", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.description;
          delete actual.category;
          delete actual.image;
          delete actual.featured;
        });
        const expected = produce(actual, (expected) => {
          delete expected.id;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });

      it("should remove id", () => {
        const actual = mock.withoutVariantsValue;
        const expected = produce(actual, (expected) => {
          delete expected.id;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant options properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].options[0].title;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].options[0].title = DEFAULT_PRODUCT_OPTION.title;
        });

        expect(schemas.server.create.cast(actual)).toMatchObject(expected);
      });
    });
  });

  describe("client", () => {
    describe("create", () => {
      it("should default product default properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.description;
          delete actual.category;
          delete actual.image;
          delete actual.featured;
        });
        const expected = produce(actual, (expected) => {
          delete expected.id;

          expected.description = DEFAULT_PRODUCT.description;
          expected.category = DEFAULT_PRODUCT.category;
          expected.image = DEFAULT_PRODUCT.image;
          expected.featured = DEFAULT_PRODUCT.featured;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });

      it("should remove id", () => {
        const actual = mock.withoutVariantsValue;
        const expected = produce(actual, (expected) => {
          delete expected.id;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant options properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].options[0].title;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].options[0].title = DEFAULT_PRODUCT_OPTION.title;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });
    });

    describe("update", () => {
      it("should return base properties untouched", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.description;
          delete actual.category;
          delete actual.image;
          delete actual.featured;
        });
        const expected = produce(actual, (expected) => {
          delete expected.id;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });

      it("should remove id", () => {
        const actual = mock.withoutVariantsValue;
        const expected = produce(actual, (expected) => {
          delete expected.id;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });

      it("should default product variant options properties", () => {
        const base = mock.withoutVariantsValue;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].options[0].title;
        });
        const expected = produce(base, (expected) => {
          delete expected.id;

          expected.options[0].options[0].title = DEFAULT_PRODUCT_OPTION.title;
        });

        expect(schemas.client.create.cast(actual)).toMatchObject(expected);
      });
    });

    describe("fetch", () => {
      it("should default base properties", () => {
        const base = mock.full;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.description;
          delete actual.category;
          delete actual.image;
          delete actual.featured;
        });
        const expected = produce(actual, (expected) => {
          expected.description = DEFAULT_PRODUCT.description;
          expected.category = DEFAULT_PRODUCT.category;
          expected.image = DEFAULT_PRODUCT.image;
          expected.featured = DEFAULT_PRODUCT.featured;
        });

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should not remove id", () => {
        const actual = mock.full;
        const expected = actual;

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should not remove value", () => {
        const actual = mock.full;
        const expected = actual;

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should default product variant properties", () => {
        const base = mock.full;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (expected) => {
          expected.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should default product variant options properties", () => {
        const base = mock.full;
        const actual = produce<Partial<Product>>(base, (actual) => {
          delete actual.options[0].options[0].title;
        });
        const expected = produce(base, (expected) => {
          expected.options[0].options[0].title = DEFAULT_PRODUCT_OPTION.title;
        });

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should cast product variant option price from string", () => {
        const base = mock.full;
        const actual = produce<Partial<Product>>(base, (actual) => {
          actual.options[0].options[0].price = "" as any;
        });
        const expected = produce(base, (expected) => {
          expected.options[0].options[0].price = 0;
        });

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });
    });
  });
});
