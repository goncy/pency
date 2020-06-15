import React from "react";
import {IDrawer, Text, Stack, Flex} from "@chakra-ui/core";

import SummaryButton from "../SummaryButton";

import Drawer, {DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Product, Variant} from "~/product/types";
import ProductVariantForm from "~/product/forms/ProductVariantForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import Stepper from "~/ui/inputs/Stepper";
import FormLabel from "~/ui/form/FormLabel";
import TruncatedText from "~/ui/feedback/TruncatedText";
import ToggleableImage from "~/ui/feedback/ToggleableImage";
import {useTranslation} from "~/i18n/hooks";
interface Props extends Omit<IDrawer, "children"> {
  onSubmit: (product: Product, options: Variant[], count: number) => void;
  product: Product;
}

const CartItemDrawer: React.FC<Props> = ({onClose, product, onSubmit, ...props}) => {
  const [count, setCount] = React.useState(1);
  const t = useTranslation();

  function handleSubmit(options: Variant[]) {
    onSubmit(product, options, count);

    handleReset();
  }

  function handleReset() {
    setCount(1);
  }

  return (
    <Drawer
      id="cart-item"
      placement="right"
      size="md"
      onAnimationEnd={handleReset}
      onClose={onClose}
      {...props}
    >
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
                  marginTop={2}
                  paddingX={4}
                  paddingY={2}
                  position="absolute"
                  top={0}
                  onClick={onClose}
                />
                {product.image && <ToggleableImage maxHeight="30vh" src={product.image} />}
                <Stack
                  shouldWrapChildren
                  direction="column"
                  flex={1}
                  marginTop={product.image ? 0 : 8}
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
