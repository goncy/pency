import produce from "immer";

import {serverToClient, clientToServer, filterByPriceChanged} from "../selectors";
import {DEFAULT_PRODUCT, DEFAULT_PRODUCT_VARIANT, DEFAULT_PRODUCT_OPTION} from "../constants";
import mock from "../mock";
import {Product} from "../types";

describe("selectors", () => {
  describe("clientToServer", () => {
    it("should default product default properties", () => {
      const base = mock.full;
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

      expect(clientToServer(actual)).toMatchObject(expected);
    });

    it("should remove id", () => {
      const actual = mock.full;
      const expected = produce(actual, (expected) => {
        delete expected.id;
      });

      expect(clientToServer(actual)).toMatchObject(expected);
    });

    it("should default product variant properties", () => {
      const base = mock.full;
      const actual = produce<Partial<Product>>(base, (actual) => {
        delete actual.options[0].count;
      });
      const expected = produce(base, (expected) => {
        delete expected.id;
        expected.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
      });

      expect(clientToServer(actual)).toMatchObject(expected);
    });

    it("should default product variant options properties", () => {
      const base = mock.full;
      const actual = produce<Partial<Product>>(base, (actual) => {
        delete actual.options[0].options[0].title;
      });
      const expected = produce(base, (expected) => {
        delete expected.id;
        expected.options[0].options[0].title = DEFAULT_PRODUCT_OPTION.title;
      });

      expect(clientToServer(actual)).toMatchObject(expected);
    });
  });

  describe("serverToClient", () => {
    describe("options", () => {
      it("should remove type for options", () => {
        const expected = mock.full;
        const actual = produce(expected, (actual: any) => {
          actual.options[0].type = "single";
        });

        expect(serverToClient(actual)).toMatchObject(expected);
      });

      it("should add count for options", () => {
        const base = mock.full;
        const actual = produce(base, (actual) => {
          delete actual.options[0].count;
        });
        const expected = produce(base, (actual) => {
          actual.options[0].count = DEFAULT_PRODUCT_VARIANT.count;
        });

        expect(serverToClient(actual)).toMatchObject(expected);
      });

      it("should return correct options untouched", () => {
        const actual = mock.withoutVariants;

        expect(serverToClient(actual)).toEqual(actual);
      });

      it("should add options when missing", () => {
        const base = mock.withoutVariants;
        const actual = produce(base, (actual) => {
          delete actual.options;
        });
        const expected = {...base, options: DEFAULT_PRODUCT.options};

        expect(serverToClient(actual)).toEqual(expected);
      });
    });
  });

  describe("filterByPriceChanged", () => {
    it("returns the price changed products only", () => {
      const base = [mock.full, mock.full];
      const actual = produce(base, (actual) => {
        actual[1].price += 100;
      });
      const expected = produce(base, (expected) => {
        expected[1].price += 100;
        expected.splice(0, 1);
      });

      expect(filterByPriceChanged(actual, base)).toEqual(expected);
    });

    it("returns the price changed products only where variants price changed", () => {
      const base = [mock.full, mock.full];
      const actual = produce(base, (actual) => {
        actual[1].options[1].options[0].price += 100;
      });
      const expected = produce(base, (expected) => {
        expected[1].options[1].options[0].price += 100;
        expected.splice(0, 1);
      });

      expect(filterByPriceChanged(actual, base)).toEqual(expected);
    });
  });
});
