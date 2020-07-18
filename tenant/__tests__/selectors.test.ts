import produce from "immer";

import {isMercadoPagoSelected, getRevalidationTime} from "../selectors";
import mock from "../mock";
import {RadioField} from "../types";

describe("selectors", () => {
  describe("isMercadoPagoSelected", () => {
    it("should return true when Mercado Pago its selected", () => {
      const base = mock.client.full.fields;
      const actual = produce(base, (actual: RadioField[]) => {
        actual[0].value = "Mercado Pago";
      });

      expect(isMercadoPagoSelected(actual)).toBe(true);
    });

    it("should return true when MercadoPago its selected", () => {
      const base = mock.client.full.fields;
      const actual = produce(base, (actual: RadioField[]) => {
        actual[0].value = "MercadoPago";
      });

      expect(isMercadoPagoSelected(actual)).toBe(true);
    });

    it("should return true when mercadopago its selected", () => {
      const base = mock.client.full.fields;
      const actual = produce(base, (actual: RadioField[]) => {
        actual[0].value = "mercadopago";
      });

      expect(isMercadoPagoSelected(actual)).toBe(true);
    });

    it("should return true when MERCADOPAGO its selected", () => {
      const base = mock.client.full.fields;
      const actual = produce(base, (actual: RadioField[]) => {
        actual[0].value = "MERCADOPAGO";
      });

      expect(isMercadoPagoSelected(actual)).toBe(true);
    });

    it("should return true when MERCADO PAGO its selected", () => {
      const base = mock.client.full.fields;
      const actual = produce(base, (actual: RadioField[]) => {
        actual[0].value = "MERCADO PAGO";
      });

      expect(isMercadoPagoSelected(actual)).toBe(true);
    });

    it("should return false when not selected", () => {
      const base = mock.client.full.fields;
      const actual = isMercadoPagoSelected(base);

      expect(actual).toBe(false);
    });
  });

  describe("getRevalidationTime", () => {
    it("should match grace period users as 10", () => {
      const tier = "free";
      const base = +new Date();
      const actual = base - 1000;
      const expected = 10;

      expect(getRevalidationTime(tier, actual)).toEqual(expected);
    });

    it("should match commercial", () => {
      const tier = "commercial";
      const actual = 1;
      const expected = 10;

      expect(getRevalidationTime(tier, actual)).toEqual(expected);
    });
  });
});
