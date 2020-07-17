import React from "react";
import {Stack, Text} from "@chakra-ui/core";

const Info: React.FC = () => (
  <Stack spacing={4}>
    <Text>
      Las variantes permiten que el usuario pueda elegir tanto adicionales como variantes de un
      producto.
    </Text>
    <Text>Las variantes se componen de:</Text>
    <Text>
      <Text as="b" marginRight={1}>
        Título:
      </Text>
      El nombre de la variante (ej: Salsa, Talle, Cantidad).
    </Text>
    <Text>
      <Text as="b" marginRight={1}>
        Cantidad:
      </Text>
      Cuántas opciones puede elegir el usuario antes de agregar el producto al pedido.
    </Text>
    <Text>
      <Text as="b" marginRight={1}>
        Obligatoriedad:
      </Text>
      Define si el usuario debe seleccionar la cantidad definida de opciones para poder agregar el
      producto al pedido.
    </Text>
    <Text>
      <Text as="b" marginRight={1}>
        Opciones:
      </Text>
      Compuestas de un "título": que indica el nombre de la opción (500GR, 1KG, etc). Y un precio
      que se sumará al valor base del producto (si el producto tiene un valor de $100 y la opción de
      $20, cuando el usuario seleccione esta opción el precio final será de $120).
    </Text>
    <Text>
      En caso de que el producto sea de tipo "Variante", el precio de cada opción indicada será el
      total del valor del producto.
    </Text>
  </Stack>
);

export default Info;
