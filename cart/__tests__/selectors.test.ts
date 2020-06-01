import {getMessage} from "../selectors";
import cartMock from "../mock";

describe("selectors", () => {
  describe("getMessage", () => {
    it("should show products without fields", () => {
      const items = cartMock.items;

      const actual = getMessage(items);

      items.forEach((item) => {
        expect(actual).toContain(item.title);
        expect(actual).toContain(item.category);
        expect(actual).toContain(item.price * item.count);
      });
    });

    it("should show products with fields", () => {
      const items = cartMock.items;
      const fields = {
        Some: "Field",
        Should: "Show",
      };

      const actual = getMessage(items, fields);

      Object.entries(fields).forEach(([title, value]) => {
        expect(actual).toContain(`${title}: *${value}*`);
      });
    });
  });
});
