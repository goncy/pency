import {ServerTenant} from "./types";

const cache = new Map<ServerTenant["slug"], ServerTenant>();

export default cache;
