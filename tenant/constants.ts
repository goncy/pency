import {ClientTenant} from "./types";

export const REVALIDATION_TIMES: Record<ClientTenant["tier"], number> = {
  free: 10,
  enterpreneur: 3600,
  commercial: 10,
};
