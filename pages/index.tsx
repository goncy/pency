import fs from "fs";

import React from "react";
import {GetStaticProps} from "next";

import LandingScreen from "~/app/screens/Landing";
import LandingLayout from "~/app/layouts/LandingLayout";
import {Provider as I18nProvider} from "~/i18n/context";
import {ServerTenant} from "~/tenant/types";
import api from "~/tenant/api/server";
import {buildSitemap} from "~/utils/sitemap";

interface Props {
  stores: ServerTenant[];
}

const LandingRoute: React.FC<Props> = () => (
  <LandingLayout>
    <I18nProvider detect>
      <LandingScreen />
    </I18nProvider>
  </LandingLayout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Get stores from api
  const stores: ServerTenant[] = await api.list();

  // Build sitemap
  fs.writeFileSync("public/sitemap.xml", buildSitemap(stores));

  // Return stores so we can build a directory
  return {
    props: {
      stores,
    },
  };
};

export default LandingRoute;
