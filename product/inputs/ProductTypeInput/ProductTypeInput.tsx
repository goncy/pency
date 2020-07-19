import React from "react";

import Select from "~/ui/inputs/Select";

interface Props {
  register: React.Ref<HTMLSelectElement>;
  name: string;
}

const ProductTypeInput: React.FC<Props> = ({register, ...props}) => (
  <Select ref={register} {...props}>
    <option value="available">Disponible</option>
    <option value="unavailable">Sin stock</option>
    <option value="promotional">Promocional</option>
    <option value="ask">A consultar</option>
    <option value="variant">Variante</option>
    <option value="hidden">Oculto</option>
  </Select>
);

export default ProductTypeInput;
