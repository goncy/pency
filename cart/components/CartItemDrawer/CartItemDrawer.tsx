import React from "react";
import {IDrawer, Text, Stack, Flex} from "@chakra-ui/core";

import SummaryButton from "../SummaryButton";

import Drawer, {DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Product, Variant} from "~/product/types";
import ProductVariantForm from "~/product/forms/ProductVariantForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import Stepper from "~/ui/inputs/Stepper";
import FormLabel from "~/ui/form/FormLabel";
import TruncatedText from "~/ui/feedback/ToggleableText";
import ToggleableImage from "~/ui/feedback/ToggleableImage";
import {useTranslation} from "~/i18n/hooks";
import {useToast} from "~/hooks/toast";
import ShareIcon from "~/ui/icons/Share";
import {useAnalytics} from "~/analytics/hooks";

interface Props extends Omit<IDrawer, "children"> {
  onSubmit: (product: Product, options: Variant[], count: number) => void;
  product: Product;
}

const CartItemDrawer: React.FC<Props> = ({onClose, product, onSubmit, ...props}) => {
  const [count, setCount] = React.useState(1);
  const t = useTranslation();
  const log = useAnalytics();
  const toast = useToast();
  const canShare = {
    prompt: Boolean(navigator?.share),
    clipboard: Boolean(navigator?.clipboard),
  };

  function handleSubmit(options: Variant[]) {
    onSubmit(product, options, count);
  }

  function handleShare() {
    if (canShare.prompt) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        .then(() => {
          toast({
            status: "success",
            title: "Bien!",
            description: "El enlace fue compartido correctamente",
          });

          log.share(product, "mobile");
        })
        .catch(() => {
          console.info("El dialogo de share fue cerrado");
        });
    } else if (canShare.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast({
            status: "success",
            title: "Link copiado",
            description: "El link se copió al portapapeles",
          });

          log.share(product, "desktop");
        })
        .catch(() => {
          toast({
            status: "warning",
            title: "No se pudo copiar el link",
            description: "No se tienen permisos para acceder al portapapeles en este navegador",
          });
        });
    }
  }

  React.useLayoutEffect(() => {
    if (product) {
      log.viewProduct(product);
    }
  }, [product, log]);

  return (
    <Drawer id="cart-item" placement="right" size="md" onClose={onClose} {...props}>
      <ProductVariantForm defaultValues={product.options} onSubmit={handleSubmit}>
        {({form, submit, isLoading, watch}) => {
          const variants = Object.values(watch());

          return (
            <>
              <DrawerBody paddingX={0} position="relative">
                <ArrowLeftIcon
                  background="white"
                  boxShadow="md"
                  cursor="pointer"
                  left={0}
                  marginTop={4}
                  paddingX={4}
                  paddingY={3}
                  position="absolute"
                  roundedRight="lg"
                  top={0}
                  onClick={onClose}
                />
                {(canShare.clipboard || canShare.prompt) && (
                  <ShareIcon
                    background="white"
                    boxShadow="md"
                    cursor="pointer"
                    marginTop={4}
                    paddingX={4}
                    paddingY={3}
                    position="absolute"
                    right={0}
                    roundedLeft="lg"
                    top={0}
                    onClick={handleShare}
                  />
                )}
                {product.image && <ToggleableImage maxHeight="30vh" src={product.image} />}
                <Stack
                  shouldWrapChildren
                  direction="column"
                  flex={1}
                  marginTop={product.image ? 0 : 16}
                  paddingTop={4}
                  paddingX={{base: 4, sm: 12}}
                  spacing={6}
                >
                  <Stack spacing={2}>
                    <Text fontSize="2xl" fontWeight="bold" lineHeight="normal">
                      {product.title}
                    </Text>
                    <TruncatedText color="gray.500" fontSize="md" limit={280} whiteSpace="pre-line">
                      {product.description}
                    </TruncatedText>
                  </Stack>
                  {form}
                  <Flex alignItems="center" justifyContent="space-between">
                    <FormLabel>{t("common.count")}</FormLabel>
                    <Stepper min={1} value={count} onChange={setCount} />
                  </Flex>
                </Stack>
              </DrawerBody>
              <DrawerFooter>
                <SummaryButton
                  isLoading={isLoading}
                  items={[
                    {
                      id: "temp",
                      product,
                      variants,
                      count,
                    },
                  ]}
                  onClick={(event) => {
                    event.stopPropagation();

                    submit();
                  }}
                >
                  {t("common.add")}
                </SummaryButton>
              </DrawerFooter>
            </>
          );
        }}
      </ProductVariantForm>
    </Drawer>
  );
};

export default CartItemDrawer;
