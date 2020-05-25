import React from "react";

import Template from "./Template";

const MESSAGE = `Hola, quería pedir:

{{productos}}

Total: {{total}}

Gracias.
`;

export const open = () => <Template value={MESSAGE} onChange={() => {}} />;

export default {title: "Template"};
