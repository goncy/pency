import React from "react";
import faker from "faker";
import {action} from "@storybook/addon-actions";

import Modal, {ModalBody, ModalHeader, ModalTitle, ModalFooter} from ".";

export const full = () => (
  <Modal>
    <ModalHeader onClose={action("close")} />
    <ModalBody>
      <ModalTitle>{faker.company.companyName()}</ModalTitle>
      {faker.lorem.paragraphs(3)}
    </ModalBody>
    <ModalFooter>{faker.company.catchPhrase()}</ModalFooter>
  </Modal>
);

export default {title: "UI/Controls/Modal"};
