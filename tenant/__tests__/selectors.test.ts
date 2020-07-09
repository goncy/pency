import produce from "immer";

import {isMercadoPagoSelected, filterByRelevant} from "../selectors";
import mock from "../mock";
import {RadioField, ClientTenant} from "../types";

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

  describe("filterByRelevant", () => {
    it("should match when relevant fields are required", () => {
      const actual: ClientTenant[] = [
        {
          id: "some-id",
          slug: "some-slug",
          category: "some-category",
          color: "teal",
          phone: "1144444444",
          mercadopago: false,
          logo: "some-logo",
          description: "some description",
          title: "some title",
        },
      ];
      const expected = actual;

      expect(filterByRelevant(actual)).toEqual(expected);
    });

    it("should not match when logo is not provided", () => {
      const actual: ClientTenant[] = [
        {
          id: "some-id",
          slug: "some-slug",
          category: "some-category",
          mercadopago: false,
          color: "teal",
          phone: "1144444444",
          description: "some description",
          title: "some title",
        },
      ];
      const expected = [];

      expect(filterByRelevant(actual)).toEqual(expected);
    });

    it("should not match when number is 5491173694572", () => {
      const actual: ClientTenant[] = [
        {
          id: "some-id",
          slug: "some-slug",
          category: "some-category",
          color: "teal",
          phone: "5491173694572",
          logo: "some-logo",
          mercadopago: false,
          description: "some description",
          title: "some title",
        },
      ];
      const expected = [];

      expect(filterByRelevant(actual)).toEqual(expected);
    });

    it("should not match when description is Armá tu tienda y recibí los pedidos via WhatsApp", () => {
      const actual: ClientTenant[] = [
        {
          id: "some-id",
          slug: "some-slug",
          category: "some-category",
          color: "teal",
          phone: "5491144444444",
          logo: "some-logo",
          mercadopago: false,
          description: "Armá tu tienda y recibí los pedidos via WhatsApp",
          title: "some title",
        },
      ];
      const expected = [];

      expect(filterByRelevant(actual)).toEqual(expected);
    });

    it("should not match when title is Pency - Tu tienda online fácil", () => {
      const actual: ClientTenant[] = [
        {
          id: "some-id",
          slug: "some-slug",
          category: "some-category",
          color: "teal",
          phone: "5491144444444",
          logo: "some-logo",
          description: "description",
          mercadopago: false,
          title: "Pency - Tu tienda online fácil",
        },
      ];
      const expected = [];

      expect(filterByRelevant(actual)).toEqual(expected);
    });
  });
});
