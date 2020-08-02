import React from "react";
import {InputProps} from "@chakra-ui/core";

import Input from "../Input";

interface Props extends InputProps {
  register: React.Ref<HTMLInputElement>;
  name: string;
}

const PixelInput: React.FC<Props> = ({register, ...props}) => (
  <Input ref={register} inputMode="numeric" type="number" {...props} />
);

export default PixelInput;
