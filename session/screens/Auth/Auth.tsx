import React from "react";
import {Flex} from "@chakra-ui/core";

import LoginScreen from "./Login";
import ResetPasswordScreen from "./ResetPassword";

import {Tenant} from "~/tenant/types";

interface Props {
  tenant: Omit<Tenant, "id">;
}

const AuthScreen: React.FC<Props> = ({tenant}) => {
  const [screen, setScreen] = React.useState("login");

  return (
    <Flex
      alignItems="center"
      backgroundColor={{base: "white", sm: "primary.50"}}
      flex={1}
      flexDirection="column"
      justifyContent="center"
      padding={{base: 0, sm: 8}}
    >
      <Flex
        alignItems="center"
        backgroundColor="white"
        direction="column"
        maxWidth={{base: "100%", sm: 400}}
        padding={8}
        rounded="lg"
        shadow={{base: "none", sm: "md"}}
        width="100%"
      >
        {screen === "login" && (
          <LoginScreen logo={tenant.logo} navigate={setScreen} title={tenant.title} />
        )}
        {screen === "reset" && <ResetPasswordScreen navigate={setScreen} />}
      </Flex>
    </Flex>
  );
};

export default AuthScreen;
