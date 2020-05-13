import React from "react";

import SessionContext from "./context";

export function useSession() {
  const {
    actions: {signIn, signOut},
  } = React.useContext(SessionContext);

  return {signIn, signOut};
}
