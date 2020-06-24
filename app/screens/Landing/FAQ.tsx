import React from "react";
import {Stack, Text, Box, Grid} from "@chakra-ui/core";

import Content from "./Content";
import Question from "./Question";

import Link from "~/ui/controls/Link";

const Mail = () => (
  <Link
    isExternal
    fontWeight={500}
    href={`mailto:${process.env.MANTAINER_EMAIL}?subject=Consulta por la tienda`}
  >
    hola@pency.app
  </Link>
);

const FAQ = () => (
  <Box
    as="section"
    backgroundColor="gray.50"
    paddingBottom={{base: 12, sm: 24}}
    paddingTop={{base: 16, sm: 24}}
    textAlign={{base: "left", sm: "center"}}
  >
    <Content>
      <Stack spacing={12}>
        <Text
          as="h2"
          color="gray.900"
          fontSize={{base: "2xl", sm: "3xl", lg: "4xl", xl: "5xl"}}
          fontWeight={500}
        >
          Preguntas frecuentes
        </Text>
        <Grid
          as="section"
          gridGap={10}
          paddingY={8}
          templateColumns={{
            base: "repeat(auto-fill, 1fr)",
            sm: "repeat(auto-fill, minmax(480px,1fr))",
          }}
        >
          <Question title="¿Cómo puedo crear mi tienda?">
            Sólo necesitás una dirección de correo electrónico válido. Ingresás el nombre de tu
            tienda y te enviamos por mail los datos para administrar tu tienda y comenzar a cargar
            tus productos. En este paso vas a poder incluir en la información de tu tienda las redes
            sociales y el WhatsApp de tu negocio.
          </Question>
          <Question title="¿Cuál es el costo de crear una tienda Pency?">
            Para pequeñas y medianas empresas crear su tienda online es totalmente gratis. Sin
            costos de alta, mantenimiento ni comisiones por venta.
            <br />
            Si se trata de empresas grandes y cadenas ofrecemos una integración personalizada de
            nuestra plataforma. Pueden escribirnos a <Mail />.
          </Question>
          <Question title="¿Cómo agrego productos a mi tienda?">
            En el panel Admin vas a encontrar el botón “Agregar producto”. Ahí, podés colocar
            nombre, foto, descripción, precio, y opciones totalmente personalizables en base a tus
            productos.
          </Question>
          <Question title="¿Puedo personalizarla?">
            ¡Claro! Seleccioná el color de tu tienda, y añadí: logo, descripción, una imagen de
            cabecera, y un mensaje destacado.
          </Question>
          <Question title="¿Cómo recibo los pedidos?">
            Asegurate de ingresar tu número de WhatsApp con el código de país. Cuando tus clientes
            confirmen el pedido en la tienda, como último paso te enviarán el mensaje que generamos
            con su pedido directamente a tu WhatsApp.
          </Question>
          <Question title="¿Cómo coordino los pagos?">
            Una vez que recibís el pedido por WhatsApp, es momento de coordinar con tus clientes y
            sin intermediarios la forma de pago que prefieran.
          </Question>
          <Question title="¿Tengo que descargar alguna App?">
            No. Las tiendas Pency son Web Apps, eso significa que funcionan directamente en el
            navegador. Además, su diseño inteligente permite que se adapten a cualquier dispositivo.
          </Question>
          <Question title="¿Cómo comparto la tienda con mis clientes?">
            En el correo de confirmación que recibís al crear tu cuenta, vas a encontrar la web de
            tu tienda (ej: pency.app/demo). Podés compartir el enlace como sitio web en todas tus
            redes sociales, o a través de WhatsApp a todos tus contactos. ¡Alcanzá a tantos clientes
            como puedas!
          </Question>
          <Question title="Necesito ayuda personalizada">
            Escribinos a <Mail /> o encontranos en Instagram, Facebook o Twitter.
          </Question>
        </Grid>
      </Stack>
    </Content>
  </Box>
);

export default FAQ;
