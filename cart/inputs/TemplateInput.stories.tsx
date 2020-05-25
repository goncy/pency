import React from "react";

import TemplateInput from "./TemplateInput";

const MESSAGE = `Hola, quería pedir:

{{productos}}

Total: {{total}}

Gracias.
`;

export const open = () => <TemplateInput value={MESSAGE} onChange={() => {}} />;

export default {title: "TemplateInput"};
