import React from "react";

import {Context, Actions, EventName, EventParams} from "./types";
import api from "./api";

import {useTenant} from "~/tenant/hooks";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AnalyticsContext = React.createContext({} as Context);

const AnalyticsProvider = ({children}: Props) => {
  const tenant = useTenant();

  function log(eventName: EventName, eventParams: Partial<EventParams> = {}) {
    api.log(eventName, {
      ...eventParams,
      content_id: tenant.slug,
    });
  }

  const actions: Actions = {log};

  return <AnalyticsContext.Provider value={{actions}}>{children}</AnalyticsContext.Provider>;
};

export {AnalyticsProvider as Provider, AnalyticsContext as default};
