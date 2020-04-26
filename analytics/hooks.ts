import React from "react";

import ProductContext from "./context";

export function useAnalytics() {
  const {
    actions: {log},
  } = React.useContext(ProductContext);

  return log;
}
