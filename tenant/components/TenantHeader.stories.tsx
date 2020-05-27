import React from "react";

import tenantMock from "../mock";

import TenantHeader from "./TenantHeader";

export const full = () => <TenantHeader tenant={tenantMock()} />;

export default {title: "TenantHeader"};
