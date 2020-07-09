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
