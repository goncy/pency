import React from "react";

import tenantMock from "../mock";

import TenantHeader from "./TenantHeader";

export const full = () => <TenantHeader tenant={tenantMock.full} />;

export default {title: "TenantHeader"};
