import React from "react";

import {useToast} from "../hooks/toast";

import {User, Context, State, Actions, Status, Credentials} from "./types";
import api from "./api";
import LoginScreen from "./screens/Login";

const SessionContext = React.createContext({} as Context);

const SessionProvider: React.FC = ({children}) => {
  const toast = useToast();
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState<Status>("pending");

  function signIn(email: Credentials["email"], password: Credentials["password"]) {
    setStatus("pending");

    api
      .signIn(email, password)
      .then(() =>
        toast({
          title: "Inicio de sesión correcto",
          description: `Hola ${email}! 👋`,
          status: "success",
        }),
      )
      .catch(() => {
        setStatus("init");

        toast({
          title: "Error",
          description: "Hubo un error al iniciar sesión, verificá las credenciales",
          status: "error",
        });
      });
  }

  function signOut() {
    setStatus("pending");

    api
      .signOut()
      .then(() =>
        toast({
          title: "Sesión cerrada",
          description: `Chau! 👋`,
          status: "success",
        }),
      )
      .catch(() => {
        toast({
          title: "Error",
          description: "No se pudo cerrar la sesión",
          status: "error",
        });

        setStatus("init");
      });
  }

  const actions: Actions = {signOut, signIn};
  const state: State = {user};

  React.useEffect(
    () =>
      api.onChange((user) => {
        setUser(user);

        setStatus("init");
      }),
    [user],
  );

  if (!user) return <LoginScreen isRestoring={status === "pending"} signIn={signIn} />;

  return <SessionContext.Provider value={{state, actions}}>{children}</SessionContext.Provider>;
};

export {SessionProvider as Provider, SessionContext as default};
