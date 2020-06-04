import {Product} from "./types";

import {ServerTenant} from "~/tenant/types";

const cache = new Map<ServerTenant["slug"], Product[]>();

export default cache;
