import {getMessage} from "../selectors";
import cartMock from "../mock";

describe("selectors", () => {
  describe("getMessage", () => {
    it("should replace {{productos}} with real products", () => {
      const MESSAGE = `Aca van:
{{productos}}
`;
      const actual = getMessage(MESSAGE, cartMock.items);

      expect(actual).not.toContain(`{{productos}}`);
    });

    it("should replace {{total}} with real total", () => {
      const MESSAGE = `Aca van:
      {{total}}
      `;
      const actual = getMessage(MESSAGE, cartMock.items);

      expect(actual).not.toContain(`{{total}}`);
    });

    it("should handle undefined fields", () => {
      const MESSAGE = `Aca van:
      {{productos}}
      `;

      getMessage(MESSAGE, cartMock.items);
    });

    it("should not replace invalid fields", () => {
      const MESSAGE = `Aca van:
      {{sarasas}}
      `;
      const FIELDS = {some: "field"};
      const actual = getMessage(MESSAGE, cartMock.items, FIELDS);

      expect(actual).toContain("{{sarasas}}");
    });

    it("should replace fields correctly", () => {
      const MESSAGE = `Aca van:
      {{some}}
      `;
      const FIELDS = {some: "field"};
      const actual = getMessage(MESSAGE, cartMock.items, FIELDS);

      expect(actual).not.toContain(`{{some}}`);
      expect(actual).toContain(`field`);
    });
  });
});
