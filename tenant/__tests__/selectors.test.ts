import * as R from "ramda";

import {clientToServer, serverToClient} from "../selectors";
import mock from "../mock";

describe("selectors", () => {
  describe("clientToServer", () => {
    it("should remove mercadopago property", () => {
      const base = mock.client.full;
      const actual = clientToServer(base);

      expect(actual).not.toHaveProperty("mercadopago");
    });

    it("should remove id property", () => {
      const base = mock.client.full;
      const actual = clientToServer(base);

      expect(actual).not.toHaveProperty("id");
    });

    it("should remove slug property", () => {
      const base = mock.client.full;
      const actual = clientToServer(base);

      expect(actual).not.toHaveProperty("slug");
    });
  });

  describe("serverToClient", () => {
    it("should map to truthy mercadopago correctly", () => {
      const base = mock.server.full;
      const actual = serverToClient(base);
      const expected = R.assoc("mercadopago", true, base);

      expect(actual).toMatchObject(expected);
    });

    it("should map to falsy mercadopago correctly", () => {
      const base = R.assoc(
        "mercadopago",
        {
          token: "",
          refresh: "",
        },
        mock.server.full,
      );
      const actual = serverToClient(base);
      const expected = R.assoc("mercadopago", false, base);

      expect(actual).toMatchObject(expected);
    });
  });
});
