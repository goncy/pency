import shortid from "shortid";
import faker from "faker";
import produce from "immer";

import {getMessage, getTotal} from "../selectors";
import cartMock from "../mock";
import {CartItem} from "../types";

import tenantMock from "~/tenant/mock";

describe("selectors", () => {
  describe("getMessage", () => {
    it("should show products without fields", () => {
      const items = [cartMock.itemWithoutVariants, cartMock.itemWithoutVariants];
      const orderId = shortid.generate();

      const actual = getMessage(items, orderId);

      items.forEach((item) => {
        expect(actual).toContain(item.product.title);
        expect(actual).toContain(item.product.price * item.count);
      });
    });

    it("should show products with fields", () => {
      const items = [cartMock.item, cartMock.item];
      const orderId = shortid.generate();
      const fields = tenantMock.client.full.fields.map((field) => ({
        ...field,
        value: faker.commerce.product(),
      }));

      const actual = getMessage(items, orderId, fields);

      fields.forEach(({title, value}) => {
        expect(actual).toContain(`${title}: *${value}*`);
      });
    });
  });

  describe("getTotal", () => {
    describe("available", () => {
      it("returns just the price if no variants", () => {
        const base = cartMock.itemWithoutVariants;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.count = 1;
          }),
        ];
        const expected = 100;

        expect(getTotal(actual)).toEqual(expected);
      });

      it("returns the price with the variants", () => {
        const base = cartMock.item;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.count = 1;
            item.variants[0].value[0].price = 100;
            item.variants[0].value[1].price = 100;
            item.variants[0].value[2].price = 100;
            item.variants[1].value[0].price = 100;
            item.variants[1].value[1].price = 100;
            item.variants[1].value[2].price = 100;
          }),
        ];
        const expected = 700;

        expect(getTotal(actual)).toEqual(expected);
      });
    });

    describe("promotional", () => {
      it("returns just the price if no variants", () => {
        const base = cartMock.itemWithoutVariants;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.count = 1;
          }),
        ];
        const expected = 100;

        expect(getTotal(actual)).toEqual(expected);
      });

      it("returns the price with the variants", () => {
        const base = cartMock.item;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.count = 1;
            item.variants[0].value[0].price = 100;
            item.variants[0].value[1].price = 100;
            item.variants[0].value[2].price = 100;
            item.variants[1].value[0].price = 100;
            item.variants[1].value[1].price = 100;
            item.variants[1].value[2].price = 100;
          }),
        ];
        const expected = 700;

        expect(getTotal(actual)).toEqual(expected);
      });
    });

    describe("variant", () => {
      it("returns the price with the variants and no base", () => {
        const base = cartMock.item;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.product.type = "variant";
            item.count = 1;
            item.variants[0].value[0].price = 100;
            item.variants[0].value[1].price = 100;
            item.variants[0].value[2].price = 100;
            item.variants[1].value[0].price = 100;
            item.variants[1].value[1].price = 100;
            item.variants[1].value[2].price = 100;
          }),
        ];
        const expected = 600;

        expect(getTotal(actual)).toEqual(expected);
      });
    });

    describe("ask", () => {
      it("returns 0", () => {
        const base = cartMock.item;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.product.type = "ask";
            item.count = 1;
          }),
        ];
        const expected = 0;

        expect(getTotal(actual)).toEqual(expected);
      });
    });

    describe("hidden", () => {
      it("returns 0", () => {
        const base = cartMock.item;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.product.type = "hidden";
            item.count = 1;
          }),
        ];
        const expected = 0;

        expect(getTotal(actual)).toEqual(expected);
      });
    });

    describe("unavailable", () => {
      it("returns 0", () => {
        const base = cartMock.item;
        const actual: CartItem[] = [
          produce(base, (item) => {
            item.product.price = 100;
            item.product.type = "unavailable";
            item.count = 1;
          }),
        ];
        const expected = 0;

        expect(getTotal(actual)).toEqual(expected);
      });
    });
  });
});
