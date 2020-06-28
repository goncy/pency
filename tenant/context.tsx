import React from "react";
import {ThemeProvider} from "@chakra-ui/core";

import {useToast} from "../hooks/toast";

import {ClientTenant, Context, State, Actions} from "./types";
import api from "./api/client";

import getTheme from "~/theme";

interface Props {
  initialValue: ClientTenant;
  children: (tenant: ClientTenant) => React.ReactElement;
}

const TenantContext = React.createContext({} as Context);

const TenantProvider: React.FC<Props> = ({children, initialValue}) => {
  const toast = useToast();
  const [tenant, setTenant] = React.useState<ClientTenant>(initialValue);

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
      <TenantContext.Provider value={{state, actions}}>{children(tenant)}</TenantContext.Provider>
    </ThemeProvider>
  );
};

export {TenantProvider as Provider, TenantContext as default};
