import React from "react";

import tenantMock from "../mock";

import TenantHeader from "./TenantHeader";

export const full = () => <TenantHeader tenant={tenantMock.full} />;
export const withoutLogo = () => <TenantHeader tenant={{...tenantMock.full, logo: ""}} />;
export const withoutBanner = () => <TenantHeader tenant={{...tenantMock.full, banner: ""}} />;
export const withoutLogoAndBanner = () => (
  <TenantHeader tenant={{...tenantMock.full, logo: "", banner: ""}} />
);

export default {title: "Tenant/Components/TenantHeader"};
