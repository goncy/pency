import React from "react";
import faker from "faker";

import Drawer, {DrawerBody, DrawerHeader, DrawerTitle, DrawerFooter} from "./";

export const full = () => (
  <Drawer isOpen>
    <DrawerHeader onBack={() => {}} onClose={() => {}} />
    <DrawerBody>
      <DrawerTitle>{faker.company.companyName()}</DrawerTitle>
      {faker.lorem.paragraphs(3)}
    </DrawerBody>
    <DrawerFooter>{faker.company.catchPhrase()}</DrawerFooter>
  </Drawer>
);

export default {title: "UI/Controls/Drawer"};
