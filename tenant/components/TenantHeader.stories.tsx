import React from "react";

import tenantMock from "../mock";

import TenantHeader from "./TenantHeader";

export const full = () => <TenantHeader tenant={tenantMock.full} />;
export const withoutLogo = () => <TenantHeader tenant={{...tenantMock.full, logo: ""}} />;

export default {title: "Tenant/Components/TenantHeader"};
