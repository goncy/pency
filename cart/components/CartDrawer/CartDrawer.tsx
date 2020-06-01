import React from "react";

import {CartItem, CheckoutFields} from "../../types";
import {getCount} from "../../selectors";

import Overview from "./Overview";
import Fields from "./Fields";

import Drawer, {DrawerHeader} from "~/ui/controls/Drawer";
import {Tenant} from "~/tenant/types";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  items: CartItem[];
  fields?: Tenant["fields"];
  onCheckout: (fields?: CheckoutFields) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<Props> = ({items, fields, onRemove, onCheckout, isOpen, onClose}) => {
  const [step, setStep] = React.useState("overview");
  const count = getCount(items);
  const hasNextStep = Boolean(fields?.length);

  const handleClose = React.useCallback(() => {
    onClose();
    handleReset();
  }, [onClose]);

  function handleReset() {
    setStep("overview");
  }

  function handleNext() {
    setStep("fields");
  }

  function handlePrevious() {
    setStep("overview");
  }

  function handleCheckoutWithoutFields() {
    onCheckout();
  }

  function handleCheckoutWithFields(fields: CheckoutFields) {
    onCheckout(fields);
  }

  React.useEffect(() => {
    if (!count) handleClose();
  }, [count, handleClose]);

  return (
    <Drawer
      id="cart"
      isOpen={isOpen}
      placement="right"
      size="md"
      onAnimationEnd={handleReset}
      onClose={handleClose}
    >
      <DrawerHeader onBack={step === "fields" && handlePrevious} onClose={handleClose} />
      {step === "overview" && (
        <Overview
          hasNextStep={hasNextStep}
          items={items}
          onRemove={onRemove}
          onSubmit={hasNextStep ? handleNext : handleCheckoutWithoutFields}
        />
      )}
      {step === "fields" && <Fields fields={fields} onSubmit={handleCheckoutWithFields} />}
    </Drawer>
  );
};

export default CartDrawer;
