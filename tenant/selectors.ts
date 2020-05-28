import {Tenant} from "./types";
import {DEFAULT_TENANT} from "./constants";

export function parseTenant(tenant: any): Tenant {
  if (!tenant?.id || !tenant?.slug) {
    throw new Error("Esta tienda es inválida");
  }

  return {
    id: tenant.id,
    slug: tenant.slug,
    category: tenant.category,
    color: tenant.color || DEFAULT_TENANT.color,
    phone: tenant.phone || DEFAULT_TENANT.phone,
    logo: tenant.logo,
    title: tenant.title,
    instagram: tenant.instagram,
    facebook: tenant.facebook,
    twitter: tenant.twitter,
    message: tenant.message,
    keywords: tenant.keywords,
    banner: tenant.banner,
    description: tenant.description,
    highlight: tenant.highlight,
  };
}

export function formatTenant(tenant: Partial<Tenant>): Partial<Tenant> {
  return {
    ...DEFAULT_TENANT,
    ...tenant,
  };
}
