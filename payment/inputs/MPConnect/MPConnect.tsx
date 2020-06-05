import React from "react";
import {Link} from "@chakra-ui/core";

import api from "../../api/server";

import {ClientTenant} from "~/tenant/types";
import Button from "~/ui/controls/Button";
import {useToast} from "~/hooks/toast";

interface Props {
  id: ClientTenant["id"];
  slug: ClientTenant["slug"];
  checked?: boolean;
  onChange: (value: boolean) => void;
}

const MPConnect: React.FC<Props> = ({id, checked, onChange, slug}) => {
  const [isLoading, toggleLoading] = React.useState(false);
  const toast = useToast();

  function handleConnect() {
    toggleLoading(true);
  }

  function handleDisconnect() {
    toggleLoading(true);

    api
      .disconnect(id, slug)
      .then(() => {
        toast({
          title: "Bien!",
          description: `Fuiste desconectado correctamente de Mercado Pago`,
          status: "success",
        });

        onChange(false);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: `Hubo un error desconectandote de Mercado Pago`,
          status: "error",
        });

        onChange(true);
      })
      .finally(() => toggleLoading(false));
  }

  return checked ? (
    <Button isLoading={isLoading} variantColor="blue" onClick={handleDisconnect}>
      Desconectar de Mercado Pago
    </Button>
  ) : (
    <Link
      _hover={{textDecoration: "none"}}
      href={`https://auth.mercadopago.com.ar/authorization?client_id=${
        process.env.MERCADOPAGO_CLIENT_ID
      }&response_type=code&platform_id=mp&redirect_uri=${
        process.env.APP_URL
      }/api/payment/auth?state=${encodeURIComponent(
        JSON.stringify({id, slug, token: localStorage.getItem("token")}),
      )}`}
      onClick={handleConnect}
    >
      <Button isLoading={isLoading} variantColor="blue">
        Conectar con Mercado Pago
      </Button>
    </Link>
  );
};

export default MPConnect;
