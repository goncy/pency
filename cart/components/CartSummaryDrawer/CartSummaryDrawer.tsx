import React from "react";
import {IDrawer} from "@chakra-ui/core";

import {CartItem} from "../../types";
import {getCount} from "../../selectors";

import Overview from "./Overview";
import Fields from "./Fields";

import Drawer from "~/ui/controls/Drawer";
import {ClientTenant, Field} from "~/tenant/types";
import {useAnalytics} from "~/analytics/hooks";

interface Props extends Omit<IDrawer, "children"> {
  onClose: VoidFunction;
  items: CartItem[];
  fields?: ClientTenant["fields"];
  onCheckout: (fields?: Field[]) => Promise<void>;
  onDecrease: (id: CartItem["id"]) => void;
  onIncrease: (id: CartItem["id"]) => void;
}

const CartSummaryDrawer: React.FC<Props> = ({
  items,
  fields,
  onIncrease,
  onDecrease,
  onCheckout,
  onClose,
}) => {
  const [step, setStep] = React.useState("overview");
  const count = getCount(items);
  const log = useAnalytics();
  const hasNextStep = Boolean(fields?.length);

  const handleClose = React.useCallback(() => {
    onClose();
    handleReset();
  }, [onClose]);

  function handleReset() {
    setStep("overview");
  }

  function handlePrevious() {
    setStep("overview");
  }

  async function handleNext() {
    log.viewFields(items);

    return setStep("fields");
  }

  async function handleCheckoutWithoutFields() {
    return onCheckout();
  }

  async function handleCheckoutWithFields(fields: Field[]) {
    return onCheckout(fields);
  }

  React.useEffect(() => {
    if (!count) handleClose();
  }, [count, handleClose]);

  React.useEffect(() => {
    // We want to log this only once on mount
    log.viewCart(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [log]);

  return (
    <Drawer
      id="cart"
      placement="right"
      size="md"
      onAnimationEnd={handleReset}
      onClose={handleClose}
    >
      {step === "overview" && (
        <Overview
          hasNextStep={hasNextStep}
          items={items}
          onClose={handleClose}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          onSubmit={hasNextStep ? handleNext : handleCheckoutWithoutFields}
        />
      )}
      {step === "fields" && (
        <Fields
          fields={fields}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onSubmit={handleCheckoutWithFields}
        />
      )}
    </Drawer>
  );
};

export default CartSummaryDrawer;
