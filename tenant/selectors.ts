import {ClientTenant, ServerTenant} from "./types";
import {DEFAULT_CLIENT_TENANT, DEFAULT_SERVER_TENANT} from "./constants";

export function formatClientTenant(tenant: any): Omit<ClientTenant, "id"> {
  return {
    slug: tenant?.slug,
    category: tenant.category || "",
    color: tenant.color || DEFAULT_CLIENT_TENANT.color,
    phone: tenant.phone || DEFAULT_CLIENT_TENANT.phone,
    logo: tenant.logo || DEFAULT_CLIENT_TENANT.logo,
    title: tenant.title || "",
    instagram: tenant.instagram || DEFAULT_CLIENT_TENANT.instagram,
    facebook: tenant.facebook || DEFAULT_CLIENT_TENANT.facebook,
    twitter: tenant.twitter || DEFAULT_CLIENT_TENANT.twitter,
    keywords: tenant.keywords || DEFAULT_CLIENT_TENANT.keywords,
    banner: tenant.banner || DEFAULT_CLIENT_TENANT.banner,
    description: tenant.description || "",
    highlight: tenant.highlight || DEFAULT_CLIENT_TENANT.highlight,
    fields: tenant.fields || DEFAULT_CLIENT_TENANT.fields,
  };
}

export function parseClientTenant(tenant: any): ClientTenant {
  return {
    ...formatClientTenant(tenant),
    id: tenant.id,
  };
}

export function formatServerTenant(tenant: any): Omit<ServerTenant, "id"> {
  return {
    ...formatClientTenant(tenant),
    mercadopago: {
      token: tenant.mercadopago?.token || DEFAULT_SERVER_TENANT.mercadopago.token,
      refresh: tenant.mercadopago?.refresh || DEFAULT_SERVER_TENANT.mercadopago.refresh,
    },
  };
}

export function parseServerTenant(tenant: any): ServerTenant {
  return {
    ...formatServerTenant(tenant),
    id: tenant.id,
  };
}
