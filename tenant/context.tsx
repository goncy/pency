import React from "react";

import {useToast} from "../hooks/toast";

import {Tenant, Context, State, Actions} from "./types";
import api from "./api";

interface Props {
  initialValue: Tenant;
}

const ProductTenant = React.createContext({} as Context);

const TenantProvider: React.FC<Props> = ({children, initialValue}) => {
  const toast = useToast();
  const [tenant, setTenant] = React.useState<Tenant>(initialValue);

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

  return <ProductTenant.Provider value={{state, actions}}>{children}</ProductTenant.Provider>;
};

export {TenantProvider as Provider, ProductTenant as default};
