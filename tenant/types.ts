import {VariantColor} from "@chakra-ui/core";

export interface Tenant {
  id: string;
  slug: string;
  logo?: string;
  color: Exclude<VariantColor, "black" | "white">;
  phone: number;
  title?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  message?: string;
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
