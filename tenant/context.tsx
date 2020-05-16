import React from "react";
import {ThemeProvider} from "@chakra-ui/core";

import {useToast} from "../hooks/toast";

import {Tenant, Context, State, Actions} from "./types";
import api from "./api";
import {DEFAULT_TENANT} from "./constants";

import getTheme from "~/theme";

interface Props {
  initialValue: Tenant;
}

const ProductTenant = React.createContext({} as Context);

const TenantProvider: React.FC<Props> = ({children, initialValue}) => {
  const toast = useToast();
  const [tenant, setTenant] = React.useState<Tenant>({
    ...DEFAULT_TENANT,
    ...initialValue,
  });

  function update(tenant: Tenant) {
    return api
      .update(tenant)
      .then(() => {
        setTenant(tenant);

        toast({
          title: "Tienda actualizada",
          description: "Tu tienda fue actualizada correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Hubo un error actualizando tu tienda, es esta tu tienda?",
          status: "error",
        });
      });
  }

  const state: State = {tenant};
  const actions: Actions = {update};

  return (
    <ThemeProvider theme={getTheme(tenant.color)}>
      <ProductTenant.Provider value={{state, actions}}>{children}</ProductTenant.Provider>
    </ThemeProvider>
  );
};

export {TenantProvider as Provider, ProductTenant as default};
