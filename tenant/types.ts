import {VariantColor} from "@chakra-ui/core";

export interface Tenant {
  id: string;
  slug: string;
  logo?: string;
  color: Exclude<VariantColor, "black" | "white">;
  phone: number;
  title?: string;
  keywords?: string;
  banner?: string;
  description?: string;
}

export interface State {
  tenant: Tenant;
}

export interface Actions {
  update: (tenant: Tenant) => void;
}

export interface Context {
  state: State;
  actions: Actions;
}
