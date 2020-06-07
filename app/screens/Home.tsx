import React from "react";
import {Text, SimpleGrid, Stack, Link} from "@chakra-ui/core";

import Content from "~/ui/structure/Content";
import {useTenant} from "~/tenant/hooks";
import MailIcon from "~/ui/icons/Mail";
import {useProducts} from "~/product/hooks";
import CircleIcon from "~/ui/icons/Circle";
import CheckIcon from "~/ui/icons/Check";
import WhatsappIcon from "~/ui/icons/WhatsApp";

const HomeScreen: React.FC = () => {
  const tenant = useTenant();
  const products = useProducts();

  const hasBasicComplete = tenant.title && tenant.category && tenant.description && tenant.phone;
  const hasCustomizationComplete = tenant.logo && tenant.banner && tenant.color;
  const hasProducts = Boolean(products.length);

  return (
    <Content padding={4}>
      <SimpleGrid columns={{base: 1, sm: 2}} spacing={{base: 4, sm: 12}}>
        <Stack spacing={8}>
          <Stack spacing={1}>
            <Text fontSize="xl" fontWeight="bold">
              Hola {tenant.title}
            </Text>
            <Text color="gray.500">
              Comenzar a utilizar una nueva herramienta nunca es fácil, por eso lo hicimos bien
              simple. Seguí estos pasos y en unos minutos tendrás tu tienda lista para compartir.
            </Text>
          </Stack>
          <Stack spacing={2}>
            <Text fontSize="md" fontWeight="500">
              Si necesitas ayuda escribinos:
            </Text>
            <Stack backgroundColor="gray.100" padding={4} rounded="md" spacing={6}>
              <Stack isInline alignItems="center" spacing={2}>
                <MailIcon width={6} />
                <Link
                  isExternal
                  fontWeight={500}
                  href={`mailto:${process.env.MANTAINER_EMAIL}?subject=Consulta por la tienda`}
                  lineHeight="normal"
                >
                  {process.env.MANTAINER_EMAIL}
                </Link>
              </Stack>
              <Stack isInline alignItems="center" spacing={2}>
                <WhatsappIcon width={6} />
                <Link
                  isExternal
                  fontWeight={500}
                  href={`https://wa.me/${process.env.MANTAINER_PHONE}`}
                  lineHeight="normal"
                >
                  {process.env.MANTAINER_PHONE}
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack backgroundColor="primary.50" padding={4} rounded="md" spacing={8}>
          <Text fontSize="lg" fontWeight="bold">
            Comenzá con estos desafíos:
          </Text>
          <Stack spacing={8}>
            <Stack isInline opacity={hasBasicComplete ? 0.3 : 1}>
              {hasBasicComplete ? <CheckIcon /> : <CircleIcon />}
              <Stack spacing={0}>
                <Text>Completá la info de tu negocio</Text>
                <Text color="gray.500" fontSize="sm">
                  Nombre de tu negocio, rubro, una descripción y número de whatsapp.
                </Text>
              </Stack>
            </Stack>
            <Stack isInline opacity={hasCustomizationComplete ? 0.3 : 1}>
              {hasCustomizationComplete ? <CheckIcon /> : <CircleIcon />}
              <Stack spacing={0}>
                <Text>Personalizá tu tienda</Text>
                <Text color="gray.500" fontSize="sm">
                  Subí tu logo, una imagen de cabecera y elegí el color de tu tienda.
                </Text>
              </Stack>
            </Stack>
            <Stack isInline opacity={hasProducts ? 0.3 : 1}>
              {hasProducts ? <CheckIcon /> : <CircleIcon />}
              <Stack spacing={0}>
                <Text>Cargá tus productos</Text>
                <Text color="gray.500" fontSize="sm">
                  Cargá tus productos y empezá a vender ya!
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Content>
  );
};

export default HomeScreen;
