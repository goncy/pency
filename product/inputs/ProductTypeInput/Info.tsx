import React from "react";
import {Stack, Text} from "@chakra-ui/core";

const Info: React.FC = () => (
  <Stack spacing={4}>
    <Text>
      <Text fontWeight="bold">Disponible:</Text>Producto disponible para quien lo solicite.
    </Text>
    <Text>
      <Text fontWeight="bold">Sin stock:</Text>Permite a los usuarios ver imágen y descripción pero
      no agregarlo al pedido.
    </Text>
    <Text>
      <Text fontWeight="bold">Promocional:</Text>Permite asignar un precio nuevo al producto, e
      indicar el precio original (previo a la promoción), el cual se mostrará tachado.
    </Text>
    <Text>
      <Text fontWeight="bold">A consultar:</Text>Muestra "A consultar" en el precio. Ideal para
      servicios.
    </Text>
    <Text>
      <Text fontWeight="bold">Variante:</Text>Producto cuyo precio depende totalmente de las
      variantes. Es necesario crear como mínimo una variante obligatoria para este tipo de
      productos.
    </Text>
    <Text>
      <Text fontWeight="bold">Oculto:</Text>El producto permanece en el panel de administración pero
      no se muestra en la tienda.
    </Text>
  </Stack>
);

export default Info;
