export const DEFAULT_TENANT = {
  phone: 5491144444444,
  color: "cyan",
  hue: 500,
  title: "Pency - Tu tienda online fácil",
  description: "Armá tu tienda y recibí los pedidos via WhatsApp",
  keywords: "pency, tienda, online, whatsapp, delivery, pedidos",
  message: `Hola, quería pedir:
<% products.map((product) => { %>
* [<%- product.category %>] - <%- product.title %> - <%- product.options ? "(" + product.options + ") - " : "" %>$<%- Number(product.price) %><% }) %>

Total: $<%- products.reduce((total, product) => total + Number(product.price), 0) %>

Gracias.`,
};
