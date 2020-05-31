import {Tenant} from "./types";
import {DEFAULT_TENANT} from "./constants";

export function parseTenant(tenant: any): Tenant {
  if (!tenant?.id || !tenant?.slug) {
    throw new Error("Esta tienda es inválida");
  }

  return {
    id: tenant.id,
    slug: tenant.slug,
    category: tenant.category || "",
    color: tenant.color || DEFAULT_TENANT.color,
    phone: tenant.phone || DEFAULT_TENANT.phone,
    logo: tenant.logo || DEFAULT_TENANT.logo,
    title: tenant.title || "",
    instagram: tenant.instagram || DEFAULT_TENANT.instagram,
    facebook: tenant.facebook || DEFAULT_TENANT.facebook,
    twitter: tenant.twitter || DEFAULT_TENANT.twitter,
    keywords: tenant.keywords || DEFAULT_TENANT.keywords,
    banner: tenant.banner || DEFAULT_TENANT.banner,
    description: tenant.description || "",
    highlight: tenant.highlight || DEFAULT_TENANT.highlight,
    fields: tenant.fields || DEFAULT_TENANT.fields,
  };
}

export function formatTenant(tenant: Partial<Tenant>): Partial<Tenant> {
  return {
    ...DEFAULT_TENANT,
    ...tenant,
  };
}
