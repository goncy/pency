import React from "react";
import {action} from "@storybook/addon-actions";

import ProductsCSVInput from "./ProductsCSVInput";

export const base = () => <ProductsCSVInput onChange={action("change")} />;

export default {title: "Product/Inputs/ProductsCSVInput"};
