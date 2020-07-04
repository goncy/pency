import fs from "fs";

import React from "react";
import {GetStaticProps} from "next";

import fetch from "~/utils/fetch";
import LandingScreen from "~/app/screens/Landing";
import LandingLayout from "~/app/layouts/LandingLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {ClientTenant} from "~/tenant/types";
import {buildSitemap} from "~/utils/sitemap";
import {filterByRelevant} from "~/tenant/selectors";

interface Props {
  tenants: ClientTenant[];
  count: number;
}

const LandingRoute: React.FC<Props> = ({tenants, count}) => (
  <LandingLayout>
    <I18nProvider detect>
      <LandingScreen count={count} tenants={tenants} />
    </I18nProvider>
  </LandingLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Get stores from api
  const tenants: ClientTenant[] = await fetch("GET", `${process.env.APP_URL}/api/tenant`);

  // Get just important ones
  const filtered = filterByRelevant(tenants);

  // Build sitemap
  fs.writeFileSync("public/sitemap.xml", buildSitemap(filtered));

  // Return stores so we can build a directory
  return {
    props: {
      count: tenants.length,
      tenants: filtered,
    },
  };
};

export default LandingRoute;
