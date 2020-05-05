import React from "react";

import ProductContext from "./context";

export function useTenant() {
  const {
    state: {tenant},
  } = React.useContext(ProductContext);

  return tenant;
}

export function useTenantActions() {
  const {
    actions: {update},
  } = React.useContext(ProductContext);

  return {update};
}
