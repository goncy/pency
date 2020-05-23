import React from "react";

import {Context, Actions, EventName, EventParams} from "./types";
import api from "./api";

import {useTenant} from "~/tenant/hooks";

const AnalyticsContext = React.createContext({} as Context);

const AnalyticsProvider: React.FC = ({children}) => {
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
