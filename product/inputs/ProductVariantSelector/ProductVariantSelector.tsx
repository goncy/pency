import React from "react";

import {Variant} from "../../types";

import SingleInput from "./SingleInput";
import MultiInput from "./MultiInput";

interface Props {
  value?: Variant;
  limit: number;
  onChange: (value: Props["value"]) => void;
}

const ProductVariantSelector: React.FC<Props> = ({limit, onChange, value, ...props}) => {
  if (limit === 1) {
    return <SingleInput value={value} onChange={onChange} {...props} />;
  }

  if (limit !== 1) {
    return <MultiInput limit={limit} value={value} onChange={onChange} {...props} />;
  }
};

export default ProductVariantSelector;
