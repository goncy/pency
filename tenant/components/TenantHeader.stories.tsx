import React from "react";

import mock from "../mock";

import TenantHeader from "./TenantHeader";

export const full = () => <TenantHeader tenant={mock.client.full} />;
export const withoutAddress = () => <TenantHeader tenant={{...mock.client.full, location: null}} />;
export const withoutLogo = () => <TenantHeader tenant={{...mock.client.full, logo: ""}} />;
export const withoutBanner = () => <TenantHeader tenant={{...mock.client.full, banner: ""}} />;
export const withoutLogoAndBanner = () => (
  <TenantHeader tenant={{...mock.client.full, logo: "", banner: ""}} />
);

export default {title: "Tenant/Components/TenantHeader"};
