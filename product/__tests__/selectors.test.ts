import produce from "immer";

import {formatProduct} from "../selectors";
import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_VARIANT} from "../constants";
import mock from "../mock";

describe("selectors", () => {
  describe("formatProduct", () => {
    describe("id", () => {
      it("should throw when no id is present", () => {
        const actual = {...mock.full, id: null};

        expect(() => formatProduct(actual)).toThrowError("Este producto es inválido");
      });
    });

    describe("options", () => {
      it("should remove type for options", () => {
        const expected = mock.full;
        const actual = produce(expected, (actual) => {
          actual.options[0].type = "single";
        });

        expect(formatProduct(actual)).toMatchObject(expected);
      });

      it("should add count for options", () => {
        const base = mock.full;
        const actual = produce(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (actual) => {
          actual.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(formatProduct(actual)).toMatchObject(expected);
      });

      it("should return correct options untouched", () => {
        const actual = mock.withoutVariants;

        expect(formatProduct(actual)).toEqual(actual);
      });

      it("should add options when missing", () => {
        const base = mock.withoutVariants;
        const actual = produce(base, (actual) => {
          delete actual.options;
        });
        const expected = {...base, options: DEFAULT_PRODUCT.options};

        expect(formatProduct(actual)).toEqual(expected);
      });
    });
  });
});
