import schemas from "../schemas";

describe("schemas", () => {
  describe("server", () => {
    describe("fetch", () => {
      it("should normalize any to server tenant", () => {
        const actual = {};
        const expected = {};

        expect(schemas.server.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting correctly", () => {
        const actual = {
          flags: [1, 2, 3],
          location: {
            address: "some address",
            coordinates: {
              lat: "10",
              lng: "10",
            },
          },
          mercadopago: {
            token: "some-token",
          },
        };
        const expected = {
          flags: ["1", "2", "3"],
          location: {
            address: "some address",
            coordinates: {
              lat: 10,
              lng: 10,
            },
          },
          mercadopago: {
            token: "some-token",
            refresh: "",
            expiration: 0,
          },
        };

        expect(schemas.server.fetch.cast(actual)).toEqual(expected);
      });

      it("PENCY-2Z - Cache case", () => {
        const actual = {
          category: "jewelry-watches",
          slug: "michelejoyas",
          layout: "portrait",
          description: "Vendo Gran Variedad de Joyas en Acero Quirúrgico y de Cristal con Plata ",
          phone: "5491158267168",
          color: "gray",
          country: "AR",
          twitter: "",
          title: "Michele Joyas en Acero Quirúrgico ",
          highlight: "",
          hook: "",
          facebook: "@Michele Joyas En Acero Quirúrgico ",
          location: {
            coordinates: {
              lng: -58.4555318,
              lat: -34.5680004,
            },
            address: "Virrey del Pino 2700, C1426 CABA",
          },
          fields: [
            {
              title: "De qué Forma pagarías?",
              note: "Se Retira por Barrio de Belgrano o se manda Moto a cargo del Cliente. ",
              required: true,
              id: "1DP_PA5zl",
              type: "text",
            },
            {
              title: "Tenes Varias Opciones de Pago",
              options: [
                {
                  id: "JHt3WLg2et",
                  title: "Efectivo",
                  note: "Mercado Pago",
                },
                {
                  id: "W79szT-jL4",
                  title: "Tarjeta de Credito",
                  note: "Tarjeta de Debito",
                },
              ],
              required: true,
              id: "-R-iRazoj",
              type: "radio",
            },
          ],
          keywords: "Anillos, Aros, Cadenas, Colgantes, Dijes, Pulseras",
          flags: [],
          mercadopago: {token: "", expiration: null, refresh: ""},
          banner:
            "https://res.cloudinary.com/goncy/image/upload/v1593371612/pency/michelejoyas/cyath8rdaspggpi1qu8y.jpg",
          id: "QRWj1dEzx6g4BFwkupX79fhgYUH3",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1593371400/pency/michelejoyas/a2eoe44p8s3khkbjjb10.jpg",
          instagram: "Michele_Joyas",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });

      it("PENCY-30 - Cache case", () => {
        const actual = {
          category: "other",
          slug: "unalome",
          layout: "landscape",
          description: "Velas de cera de soja y aromas para el hogar",
          phone: "5491134495118",
          color: "pink",
          country: "AR",
          twitter: "",
          title: "UNALOME Velas & Aromas",
          highlight: "",
          hook: "",
          facebook: "unalomevelas",
          location: null,
          fields: [],
          keywords:
            "pency, tienda, online, whatsapp, delivery, pedidos,cera de soja, deco, hogar, quilmes, velas, aromas",
          flags: [],
          mercadopago: {token: "", expiration: null, refresh: ""},
          banner:
            "https://res.cloudinary.com/goncy/image/upload/v1594421698/pency/unalome/nkmyuziflvl4g79tnoha.jpg",
          id: "f0N6MLYGlXesZqZg8Bnigxty3Q22",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1594420621/pency/unalome/iuorwdw8u5mb17grnop0.jpg",
          instagram: "unalome_velas",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });

      it("PENCY-31 - Cache case", () => {
        const actual = {
          instagram: "sexshopsentidos",
          color: "red",
          twitter: "",
          hook: "",
          keywords: "pency, tienda, online, whatsapp, delivery, pedidos, sex shop",
          logo:
            "https://res.cloudinary.com/goncy/image/upload/v1591988905/pency/sexshopsentidos/ide4humvpd3dpawxtdux.jpg",
          mercadopago: {token: "", expiration: null, refresh: ""},
          id: "ege30MHDe7Xw5qH0Dbmbp5PKsb13",
          category: "toys",
          layout: "portrait",
          title: "Sentidos Sex Shop",
          location: null,
          description: "Los mejores juguetes y lubricantes en la puerta de tu casa",
          phone: "5491132856279",
          facebook: "Sex Shop Sentidos",
          address: "",
          banner:
            "https://res.cloudinary.com/goncy/image/upload/v1591988962/pency/sexshopsentidos/elnptptcz39ygnh1oupo.jpg",
          slug: "sexshopsentidos",
          country: "AR",
          flags: [],
          fields: [],
          highlight: "Animate a jugar 🔥🔥",
        };
        const expected = true;

        expect(schemas.server.fetch.isValidSync(actual)).toEqual(expected);
      });
    });

    describe("update", () => {
      it("should normalize any to server tenant", () => {
        const actual = {};
        const expected = {};

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting location", () => {
        const actual = {
          location: {
            address: "some adress",
            coordinates: {
              lat: "100.00",
              lng: "100.00",
            },
          },
        };
        const expected = {
          location: {
            address: "some adress",
            coordinates: {
              lat: 100,
              lng: 100,
            },
          },
        };

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting text fields", () => {
        const actual = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "text",
              required: "false",
            },
          ],
        };
        const expected = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "text",
              note: "",
              required: false,
            },
          ],
        };

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant casting radio fields", () => {
        const actual = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "radio",
              required: "false",
              options: [
                {
                  id: "some-sub-id",
                  title: "some-title",
                },
              ],
            },
          ],
        };
        const expected = {
          fields: [
            {
              id: "some-id",
              title: "some-title",
              type: "radio",
              options: [
                {
                  id: "some-sub-id",
                  title: "some-title",
                  note: "",
                },
              ],
              required: false,
            },
          ],
        };

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server removing mercadopago", () => {
        const actual = {
          mercadopago: {
            token: "some-token",
            refresh: "some-refresh",
            expiration: 123,
          },
        };
        const expected = {};

        expect(schemas.server.update.cast(actual)).toEqual(expected);
      });
    });

    describe("create", () => {
      it("should normalize any to server tenant", () => {
        const actual = {
          slug: "goncy",
        };
        const expected = {
          slug: "goncy",
          color: "teal",
          country: "AR",
          description: "Armá tu tienda y recibí los pedidos via WhatsApp",
          keywords: "pency, tienda, online, whatsapp, delivery, pedidos, shop",
          location: null,
          layout: "portrait",
          mercadopago: null,
          phone: "5491173694572",
          title: "Pency - Tu tienda online fácil",
          flags: [],
        };

        expect(schemas.server.create.cast(actual)).toEqual(expected);
      });

      it("should normalize location if present", () => {
        const actual = {
          slug: "goncy",
          location: {
            address: "some-address",
            coordinates: {
              lat: "100",
              lng: "100",
            },
          },
        };
        const expected = {
          slug: "goncy",
          color: "teal",
          country: "AR",
          description: "Armá tu tienda y recibí los pedidos via WhatsApp",
          keywords: "pency, tienda, online, whatsapp, delivery, pedidos, shop",
          mercadopago: null,
          phone: "5491173694572",
          title: "Pency - Tu tienda online fácil",
          location: {
            address: "some-address",
            coordinates: {
              lat: 100,
              lng: 100,
            },
          },
          layout: "portrait",
          flags: [],
        };

        expect(schemas.server.create.cast(actual)).toEqual(expected);
      });
    });

    describe("mercadopago", () => {
      it("should normalize any to server tenant mercadopago", () => {
        const actual = {
          mercadopago: null,
        };
        const expected = {
          mercadopago: null,
        };

        expect(schemas.server.mercadopago.cast(actual)).toEqual(expected);
      });

      it("should normalize any to server tenant mercadopago casting correctly", () => {
        const actual = {
          mercadopago: {
            token: "some-token",
          },
        };
        const expected = {
          mercadopago: {
            expiration: 0,
            refresh: "",
            token: "some-token",
          },
        };

        expect(schemas.server.mercadopago.cast(actual)).toEqual(expected);
      });
    });
  });

  describe("client", () => {
    describe("fetch", () => {
      it("should normalize any to client tenant", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: "teal",
          phone: "1144444444",
        };
        const expected = {
          ...actual,
          banner: "",
          category: "",
          country: "AR",
          description: "",
          facebook: "",
          fields: [],
          flags: [],
          highlight: "",
          hook: "",
          instagram: "",
          keywords: "",
          location: null,
          layout: "portrait",
          logo: "",
          mercadopago: false,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant casting correctly", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: "teal",
          phone: 1144444444,
          highlight: "Some highlight",
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          banner: "",
          category: "",
          country: "AR",
          description: "",
          facebook: "",
          fields: [],
          flags: [],
          hook: "",
          instagram: "",
          keywords: "",
          location: null,
          layout: "portrait",
          logo: "",
          mercadopago: false,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant casting location correctly", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: "teal",
          phone: 1144444444,
          highlight: "Some highlight",
          location: {
            address: "some address",
            coordinates: {
              lat: "10.001",
              lng: "10.001",
            },
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          banner: "",
          category: "",
          country: "AR",
          description: "",
          facebook: "",
          fields: [],
          flags: [],
          hook: "",
          instagram: "",
          keywords: "",
          location: {
            address: "some address",
            coordinates: {
              lat: 10.001,
              lng: 10.001,
            },
          },
          layout: "portrait",
          logo: "",
          mercadopago: false,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant casting flags correctly", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: "teal",
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
          location: {
            address: "some address",
            coordinates: {
              lat: "10.001",
              lng: "10.001",
            },
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          banner: "",
          category: "",
          country: "AR",
          description: "",
          facebook: "",
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          instagram: "",
          keywords: "",
          location: {
            address: "some address",
            coordinates: {
              lat: 10.001,
              lng: 10.001,
            },
          },
          layout: "portrait",
          logo: "",
          mercadopago: false,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant allowing null location", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: "teal",
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
          location: null,
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          banner: "",
          category: "",
          country: "AR",
          description: "",
          facebook: "",
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          instagram: "",
          keywords: "",
          location: null,
          layout: "portrait",
          logo: "",
          mercadopago: false,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should normalize any to client tenant adding location when not present", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: "teal",
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          banner: "",
          category: "",
          country: "AR",
          description: "",
          facebook: "",
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          instagram: "",
          keywords: "",
          location: null,
          layout: "portrait",
          logo: "",
          mercadopago: false,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });

      it("should return false when mercadopago is not valid", () => {
        const actual = {
          id: "some-id",
          slug: "some-slug",
          color: "teal",
          phone: 1144444444,
          highlight: "Some highlight",
          flags: [1, 2, 3],
          mercadopago: {
            expiration: null,
            refresh: "",
            token: "",
          },
        };
        const expected = {
          ...actual,
          phone: "1144444444",
          banner: "",
          category: "",
          country: "AR",
          description: "",
          facebook: "",
          fields: [],
          flags: ["1", "2", "3"],
          hook: "",
          instagram: "",
          keywords: "",
          location: null,
          layout: "portrait",
          logo: "",
          mercadopago: false,
          title: "",
          twitter: "",
        };

        expect(schemas.client.fetch.cast(actual)).toEqual(expected);
      });
    });
  });
});
