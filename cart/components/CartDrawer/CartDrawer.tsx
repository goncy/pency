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

  function handleNext() {
    setStep("fields");
  }

  React.useEffect(() => {
    if (!count) onClose();
  }, [count, onClose]);

  return (
    <Drawer id="cart" isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      {step === "overview" && (
        <Overview
          hasNextStep={hasNextStep}
          items={items}
          onRemove={onRemove}
          onSubmit={hasNextStep ? handleNext : onCheckout}
        />
      )}
      {step === "fields" && <Fields fields={fields} onSubmit={onCheckout} />}
    </Drawer>
  );
};

export default CartDrawer;
