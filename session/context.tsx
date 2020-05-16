import React from "react";

import {useToast} from "../hooks/toast";

import {User, Context, State, Actions, Status, Credentials} from "./types";
import api from "./api";
import LoginScreen from "./screens/Login";

import {useTenant} from "~/tenant/hooks";

const SessionContext = React.createContext({} as Context);

const SessionProvider: React.FC = ({children}) => {
  const toast = useToast();
  const {id: tenant, logo, title} = useTenant();
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState<Status>("pending");

  function signIn(email: Credentials["email"], password: Credentials["password"]) {
    setStatus("pending");

    api.signIn(email, password).catch(() => {
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
        if (user) {
          if (user.uid === tenant) {
            setUser(user);

            toast({
              title: "Inicio de sesión correcto",
              description: `Hola ${user.email}! 👋`,
              status: "success",
            });

            return setStatus("init");
          } else {
            api.signOut();

            toast({
              title: "Error",
              description: "El usuario no corresponde a la tienda",
              status: "error",
            });

            return setStatus("init");
          }
        } else {
          setUser(user);

          return setStatus("init");
        }
      }),
    [toast, tenant],
  );

  React.useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => localStorage.setItem("token", token));
    }
  }, [user]);

  if (!user)
    return (
      <LoginScreen isRestoring={status === "pending"} logo={logo} signIn={signIn} title={title} />
    );

  return <SessionContext.Provider value={{state, actions}}>{children}</SessionContext.Provider>;
};

export {SessionProvider as Provider, SessionContext as default};
