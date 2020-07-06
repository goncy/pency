import React from "react";
import {Link, ButtonProps} from "@chakra-ui/core";

import api from "../../api/server";

import {ClientTenant} from "~/tenant/types";
import {useToast} from "~/hooks/toast";
import IconButton from "~/ui/controls/IconButton";
import ZapIcon from "~/ui/icons/Zap";

interface Props extends Omit<ButtonProps, "onChange" | "leftIcon" | "rightIcon" | "children"> {
  id: ClientTenant["id"];
  slug: ClientTenant["slug"];
  checked?: boolean;
  defaultChecked?: boolean;
  onChange: (value: boolean) => void;
}

const MPConnect: React.FC<Props> = ({id, checked, onChange, slug, ...props}) => {
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
    <IconButton
      color="red.500"
      fontWeight="normal"
      isLoading={isLoading}
      justifyContent="flex-start"
      leftIcon={ZapIcon}
      loadingText="Desconectando"
      onClick={handleDisconnect}
      {...props}
    >
      Desconectar Mercado Pago
    </IconButton>
  ) : (
    <Link
      _hover={{textDecoration: "none"}}
      href={`https://auth.mercadopago.com.ar/authorization?client_id=${
        process.env.MERCADOPAGO_CLIENT_ID
      }&response_type=code&platform_id=mp&redirect_uri=${
        process.env.APP_URL
      }/api/payment/auth&state=${encodeURIComponent(
        JSON.stringify({id, slug, token: localStorage.getItem("token")}),
      )}`}
      onClick={handleConnect}
    >
      <IconButton
        fontWeight="normal"
        isLoading={isLoading}
        justifyContent="flex-start"
        leftIcon={ZapIcon}
        loadingText="Conectando"
        {...props}
      >
        Conectar Mercado Pago
      </IconButton>
    </Link>
  );
};

export default MPConnect;
