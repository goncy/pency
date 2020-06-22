import React from "react";

import TenantContext from "./context";

export function useTenant() {
  const {
    state: {tenant},
  } = React.useContext(TenantContext);

  return tenant;
}

export function useTenantActions() {
  const {
    actions: {update},
  } = React.useContext(TenantContext);

  return {update};
}
