import fs from "fs";

import React from "react";
import {GetStaticProps} from "next";

import LandingScreen from "~/app/screens/Landing";
import LandingLayout from "~/app/layouts/LandingLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {ClientTenant} from "~/tenant/types";
import {buildSitemap} from "~/utils/sitemap";
import {filterByRelevant} from "~/tenant/selectors";
import tenantApi from "~/tenant/api/server";
import schemas from "~/tenant/schemas";

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
  try {
    // Get stores from db
    const tenants: ClientTenant[] = await tenantApi
      .list()
      // Cast them as client tenants
      .then((tenants) => tenants.map((tenant) => schemas.client.fetch.cast(tenant)));

    // Get just important ones
    const filtered = filterByRelevant(tenants);

    // Build sitemap
    fs.writeFileSync("public/sitemap.xml", buildSitemap(filtered));

    // Return stores so we can build a directory
    return {
      props: {
        tenants: filtered,
      },
    };
  } catch (e) {
    // Allow this to fail
    return {
      props: {
        tenants: [],
      },
    };
  }
};

export default LandingRoute;
