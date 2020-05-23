describe("User filters", () => {
  describe("criteria", () => {
    it("should filter by criteria", () => {
      cy.visit("/full");

      cy.get(`[data-test-id="product"]`).should("have.length", 3);
      cy.get(`[data-test-id="filters"] input`).type("con sub categoria");
      cy.get(`[data-test-id="product"]`).should("have.length", 1);
    });

    it("should filter by criteria being case insensitive", () => {
      cy.visit("/full");

      cy.get(`[data-test-id="filters"] input`).type("con Sub CategOria");
      cy.get(`[data-test-id="product"]`).should("have.length", 1);
    });

    it("should show a message when no products were found", () => {
      cy.visit("/full");

      cy.get(`[data-test-id="filters"] input`).type("this should not match");
      cy.get(`[data-test-id="product"]`).should("have.length", 0);
      cy.get(`[data-test-id="empty"]`).should("be.visible");
    });
  });

  describe("category", () => {
    it("should filter by category", () => {
      cy.visit("/full");

      cy.get(`[data-test-id="filters"] select`).select("Solitario");
      cy.get(`[id="Solitario"] [data-test-id="category-title"]`).should("be.visible");
    });
  });
});
