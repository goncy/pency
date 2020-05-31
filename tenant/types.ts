import {VariantColor} from "@chakra-ui/core";

export interface Tenant {
  id: string;
  slug: string;
  category: string;
  color: Exclude<VariantColor, "black" | "white">;
  phone: string;
  logo: string;
  title: string;
  instagram: string;
  facebook: string;
  twitter: string;
  keywords: string;
  banner: string;
  description: string;
  highlight: string;
  fields: Field[];
}

export type Field = TextField | RadioField;

export interface TextField {
  id: string;
  title: string;
  type: "text";
  note: string;
}

export interface RadioField {
  id: string;
  title: string;
  type: "radio";
  options: RadioFieldOption[];
}

export interface RadioFieldOption {
  id: string;
  title: string;
  note: string;
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
