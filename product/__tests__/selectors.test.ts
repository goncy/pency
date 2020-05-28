import produce from "immer";

import {parseProduct, formatProduct} from "../selectors";
import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_VARIANT, DEFAULT_PRODUCT_OPTION} from "../constants";
import mock from "../mock";
import {Product} from "../types";

describe("selectors", () => {
  describe("formatProduct", () => {
    it("should default product default properties", () => {
      const base = mock.full;
      const actual = produce<Partial<Product>>(base, (actual) => {
        delete actual.description;
        delete actual.category;
        delete actual.image;
        delete actual.featured;
      });
      const expected = {
        ...base,
        description: DEFAULT_PRODUCT.description,
        category: DEFAULT_PRODUCT.category,
        image: DEFAULT_PRODUCT.image,
        featured: DEFAULT_PRODUCT.featured,
      };

      expect(formatProduct(actual)).toMatchObject(expected);
    });

    it("should default product variant properties", () => {
      const base = mock.full;
      const actual = produce<Partial<Product>>(base, (actual) => {
        delete actual.options[0].count;
      });
      const expected = produce(base, (expected) => {
        expected.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
      });

      expect(formatProduct(actual)).toMatchObject(expected);
    });

    it("should default product variant options properties", () => {
      const base = mock.full;
      const actual = produce<Partial<Product>>(base, (actual) => {
        delete actual.options[0].options[0].title;
      });
      const expected = produce(base, (expected) => {
        expected.options[0].options[0].title = DEFAULT_PRODUCT_OPTION.title;
      });

      expect(formatProduct(actual)).toMatchObject(expected);
    });
  });

  describe("parseProduct", () => {
    describe("id", () => {
      it("should throw when no id is present", () => {
        const actual = {...mock.full, id: null};

        expect(() => parseProduct(actual)).toThrowError("Este producto es inválido");
      });
    });

    describe("options", () => {
      it("should remove type for options", () => {
        const expected = mock.full;
        const actual = produce(expected, (actual) => {
          actual.options[0].type = "single";
        });

        expect(parseProduct(actual)).toMatchObject(expected);
      });

      it("should add count for options", () => {
        const base = mock.full;
        const actual = produce(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (actual) => {
          actual.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(parseProduct(actual)).toMatchObject(expected);
      });

      it("should return correct options untouched", () => {
        const actual = mock.withoutVariants;

        expect(parseProduct(actual)).toEqual(actual);
      });

      it("should add options when missing", () => {
        const base = mock.withoutVariants;
        const actual = produce(base, (actual) => {
          delete actual.options;
        });
        const expected = {...base, options: DEFAULT_PRODUCT.options};

        expect(parseProduct(actual)).toEqual(expected);
      });
    });
  });
});
