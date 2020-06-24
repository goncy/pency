import React from "react";

import Landing from "~/app/screens/Landing";
import LandingLayout from "~/app/layouts/LandingLayout";
import {Provider as I18nProvider} from "~/i18n/context";

const LandingScreen: React.FC = () => (
  <LandingLayout>
    <I18nProvider>
      <Landing />
    </I18nProvider>
  </LandingLayout>
);

export default LandingScreen;
