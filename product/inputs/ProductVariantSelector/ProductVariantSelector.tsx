import React from "react";

import {Option} from "../../types";

import SingleInput from "./SingleInput";
import MultiInput from "./MultiInput";

interface Props {
  options: Props["value"];
  value?: Option[];
  limit: number;
  onChange: (value: Props["value"]) => void;
}

const ProductVariantSelector: React.FC<Props> = ({
  limit,
  options,
  onChange,
  value = [],
  ...props
}) => {
  if (limit === 1) {
    return <SingleInput options={options} value={value} onChange={onChange} {...props} />;
  }

  if (limit !== 1) {
    return (
      <MultiInput limit={limit} options={options} value={value} onChange={onChange} {...props} />
    );
  }
};

export default ProductVariantSelector;
