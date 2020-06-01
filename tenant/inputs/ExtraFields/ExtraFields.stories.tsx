import React from "react";

import tenantMock from "../../mock";

import ExtraFields from "./ExtraFields";

export const empty = () => <ExtraFields value={[]} onChange={() => {}} />;
export const full = () => <ExtraFields value={tenantMock.full.fields} onChange={() => {}} />;

export default {title: "Tenant/Inputs/ExtraFields"};
