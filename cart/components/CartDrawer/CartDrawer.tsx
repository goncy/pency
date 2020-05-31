import React from "react";
import {DrawerOverlay, Drawer} from "@chakra-ui/core";

import {CartItem, Field} from "../../types";
import {getCount} from "../../selectors";

import Overview from "./Overview";
import Fields from "./Fields";

import {Tenant} from "~/tenant/types";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  items: CartItem[];
  fields?: Tenant["fields"];
  onCheckout: (fields?: Field) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<Props> = ({items, fields, onRemove, onCheckout, isOpen, onClose}) => {
  const [step, setStep] = React.useState("overview");
  const count = getCount(items);
  const hasNextStep = Boolean(fields?.length);

  function handleClose() {
    onClose();
    setStep("overview");
  }

  function handleNext() {
    setStep("fields");
  }

  function handlePrevious() {
    setStep("overview");
  }

  React.useEffect(() => {
    if (!count) onClose();
  }, [count, onClose]);

  return (
    <Drawer id="cart" isOpen={isOpen} placement="right" size="md" onClose={handleClose}>
      <DrawerOverlay />
      {step === "overview" && (
        <Overview
          hasNextStep={hasNextStep}
          items={items}
          onBack={handleClose}
          onRemove={onRemove}
          onSubmit={hasNextStep ? handleNext : onCheckout}
        />
      )}
      {step === "fields" && (
        <Fields fields={fields} onBack={handlePrevious} onSubmit={onCheckout} />
      )}
    </Drawer>
  );
};

export default CartDrawer;
