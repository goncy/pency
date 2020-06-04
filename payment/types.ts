import {CartItem} from "~/cart/types";
import {ServerTenant} from "~/tenant/types";

export interface Order {
  id: string;
  slug: ServerTenant["slug"];
  items: CartItem[];
  successUrl: string;
}
