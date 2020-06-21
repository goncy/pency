import React from "react";
import {ThemeProvider} from "@chakra-ui/core";

import {useToast} from "../hooks/toast";

import {ClientTenant, Context, State, Actions} from "./types";
import api from "./api/client";
import {DEFAULT_CLIENT_TENANT} from "./constants";

import getTheme from "~/theme";

interface Props {
  initialValue: ClientTenant;
}

const TenantContext = React.createContext({} as Context);

const TenantProvider: React.FC<Props> = ({children, initialValue}) => {
  const toast = useToast();
  const [tenant, setTenant] = React.useState<ClientTenant>({
    ...DEFAULT_CLIENT_TENANT,
    ...initialValue,
  });

  function update(tenant: ClientTenant) {
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
          description:
            "Hubo un error actualizando tu tienda, refrescá la página e intentá nuevamente",
          status: "error",
        });
      });
  }

  const state: State = {tenant};
  const actions: Actions = {update};

  return (
    <ThemeProvider theme={getTheme(tenant.color)}>
      <TenantContext.Provider value={{state, actions}}>{children}</TenantContext.Provider>
    </ThemeProvider>
  );
};

export {TenantProvider as Provider, TenantContext as default};
