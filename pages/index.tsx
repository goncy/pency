import fs from "fs";

import React from "react";
import {GetStaticProps} from "next";

import LandingScreen from "~/app/screens/Landing";
import LandingLayout from "~/app/layouts/LandingLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {ClientTenant} from "~/tenant/types";
import {buildSitemap} from "~/utils/sitemap";
import api from "~/tenant/api/server";
import schemas from "~/tenant/schemas";
import queries from "~/tenant/queries";

interface Props {
  tenants: ClientTenant[];
}

const LandingRoute: React.FC<Props> = ({tenants}) => (
  <LandingLayout>
    <I18nProvider detect>
      <LandingScreen tenants={tenants} />
    </I18nProvider>
  </LandingLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Get stores from db
  const tenants: ClientTenant[] = await api
    .list(queries.relevant, {
      // Get just relevant fields
      id: 1,
      slug: 1,
      category: 1,
      title: 1,
      location: 1,
    })
    // Cast them as client tenants
    .then((tenants) =>
      tenants.map((tenant) => schemas.client.fetch.cast(tenant, {stripUnknown: true})),
    );

  // Build sitemap
  fs.writeFileSync("public/sitemap.xml", buildSitemap(tenants));

  // Return stores so we can build a directory
  return {
    props: {
      tenants,
    },
  };
};

export default LandingRoute;
