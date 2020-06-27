import React from "react";

import LandingScreen from "~/app/screens/Landing";
import LandingLayout from "~/app/layouts/LandingLayout";
import {Provider as I18nProvider} from "~/i18n/context";

const LandingRoute: React.FC = () => (
  <LandingLayout>
    <I18nProvider>
      <LandingScreen />
    </I18nProvider>
  </LandingLayout>
);

export default LandingRoute;
