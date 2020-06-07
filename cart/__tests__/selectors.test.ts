import shortid from "shortid";
import faker from "faker";

import {getMessage} from "../selectors";
import cartMock from "../mock";

import tenantMock from "~/tenant/mock";

describe("selectors", () => {
  describe("getMessage", () => {
    it("should show products without fields", () => {
      const items = cartMock.items;
      const orderId = shortid.generate();

      const actual = getMessage(items, orderId);

      items.forEach((item) => {
        expect(actual).toContain(item.title);
        expect(actual).toContain(item.price * item.count);
      });
    });

    it("should show products with fields", () => {
      const items = cartMock.items;
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
});
