import React from "react";

import RadioGroup, {RadioColumn} from "~/ui/inputs/Radio";

const LayoutInput: React.FC = (props) => (
  <RadioGroup isInline {...props}>
    <RadioColumn key="portrait" value="portrait">
      Vertical
    </RadioColumn>
    <RadioColumn key="landscape" value="landscape">
      Horizontal
    </RadioColumn>
  </RadioGroup>
);

export default LayoutInput;
