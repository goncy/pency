import React from "react";

import api from "./api";

import {useTenant} from "~/tenant/hooks";
import {CURRENCIES} from "~/i18n/constants";
import {Variant, Product} from "~/product/types";
import {getVariantsString, getVariantsPrice} from "~/product/selectors";
import {getTotal} from "~/cart/selectors";
import {CartItem} from "~/cart/types";

interface Context {
  actions: {
    log: {
      addToCart: (product: Product, variants: Variant[], count: number) => void;
      removeFromCart: (product: Product, variants: Variant[], count: number) => void;
      viewCart: (items: CartItem[]) => void;
      viewFields: (items: CartItem[]) => void;
      checkout: (orderId: string, items: CartItem[]) => void;
      share: (product: Product, method: string) => void;
      viewProduct: (product: Product) => void;
    };
  };
}

const AnalyticsContext = React.createContext({} as Context);

const AnalyticsProvider: React.FC = ({children}) => {
  const tenant = useTenant();

  function addToCart(product: Product, variants: Variant[], count: number) {
    api.log("add_to_cart", {
      content_id: tenant.slug,
      items: [
        {
          quantity: count,
          item_category: product.category,
          item_id: product.id,
          item_variant: getVariantsString(variants),
          item_name: product.title,
          price: (product.price + getVariantsPrice(variants)) * count,
        },
      ],
      currency: CURRENCIES[tenant.country],
      value: product.price,
    });
  }

  function removeFromCart(product: Product, variants: Variant[], count: number) {
    api.log("remove_from_cart", {
      content_id: tenant.slug,
      items: [
        {
          quantity: count,
          item_category: product.category,
          item_id: product.id,
          item_variant: getVariantsString(variants),
          item_name: product.title,
          price: (product.price + getVariantsPrice(variants)) * count,
        },
      ],
      currency: CURRENCIES[tenant.country],
      value: product.price,
    });
  }

  function viewCart(items: CartItem[]) {
    api.log("begin_checkout", {
      checkout_option: "overview",
      value: getTotal(items),
      currency: CURRENCIES[tenant.country],
      items,
    });
  }

  function viewFields(items: CartItem[]) {
    api.log("checkout_progress", {
      checkout_option: "fields",
      value: getTotal(items),
      currency: CURRENCIES[tenant.country],
      items,
    });
  }

  function checkout(orderId: string, items: CartItem[]) {
    api.log("purchase", {
      transaction_id: orderId,
      value: getTotal(items),
      currency: CURRENCIES[tenant.country],
      items,
    });
  }

  function share(product: Product, method: string) {
    api.log("share", {
      content_id: tenant.slug,
      content_type: "product",
      screen_name: product.title,
      method,
    });
  }

  function viewProduct(product: Product) {
    api.log("view_item", {
      items: [product],
    });
  }

  const actions: Context["actions"] = {
    log: {
      viewCart,
      viewFields,
      addToCart,
      removeFromCart,
      checkout,
      share,
      viewProduct,
    },
  };

  return <AnalyticsContext.Provider value={{actions}}>{children}</AnalyticsContext.Provider>;
};

export {AnalyticsProvider as Provider, AnalyticsContext as default};
