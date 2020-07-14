import {ClientTenant} from "./types";

export const REVALIDATION_TIMES: Record<ClientTenant["tier"], number> = {
  free: 30,
  enterpreneur: 3600,
  commercial: 10,
};
