import React from "react";
import {useDisclosure} from "@chakra-ui/core";

import {Product} from "./types";
import api from "./api/client";
import schemas from "./schemas";
import {canAddProduct} from "./selectors";
import ProductLimitWarning from "./components/ProductLimitWarning";

import reporter from "~/reporting";
import {useToast} from "~/hooks/toast";
import {useTenant} from "~/tenant/hooks";
import {sortBy} from "~/selectors/sort";

export interface Context {
  state: {
    products: Product[];
  };
  actions: {
    create: (product: Product) => Promise<void>;
    update: (product: Product) => Promise<void>;
    remove: (id: Product["id"]) => Promise<void>;
    upsert: (products: Product[]) => Promise<void>;
  };
}
interface Props {
  initialValues: Product[];
}

const ProductContext = React.createContext({} as Context);

const ProductProvider: React.FC<Props> = ({initialValues, children}) => {
  const tenant = useTenant();
  const toast = useToast();
  const [products, setProducts] = React.useState<Product[]>(
    sortBy(initialValues, (item) => item?.title),
  );
  // Create a state to show in case a user wants to add more products than allowed
  const {
    isOpen: isLimitWarningShown,
    onOpen: showLimitWarning,
    onClose: closeLimitWarning,
  } = useDisclosure();

  async function create(product: Product) {
    if (!canAddProduct(tenant.tier, products.length)) {
      // Report to sentry
      reporter.message("Se alcanzó el límite de productos para tu plan", {
        origin: "ProductContext",
        extras: {
          slug: tenant.slug,
          tier: tenant.tier,
        },
      });

      // Early return
      return showLimitWarning();
    }

    const casted = schemas.client.create.cast(product);

    return api
      .create(tenant.id, casted)
      .then((product) => {
        setProducts(products.concat(product));

        toast({
          title: "Producto creado",
          description: "Tu producto fue creado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Hubo un error creando el producto, refrescá la página e intentá nuevamente",
          status: "error",
        });
      });
  }

  function update(product: Product) {
    const casted = schemas.client.update.cast(product);

    return api
      .update(tenant.id, casted)
      .then(() => {
        setProducts((products) =>
          products.map((_product) =>
            _product.id === casted.id ? {..._product, ...casted} : _product,
          ),
        );

        toast({
          title: "Producto actualizado",
          description: "Tu producto fue actualizado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "Hubo un error actualizando el producto, refrescá la página e intentá nuevamente",
          status: "error",
        });
      });
  }

  function upsert(products: Product[]) {
    const casted = products.map((product) =>
      product.id ? schemas.client.update.cast(product) : schemas.client.create.cast(product),
    );

    return api
      .upsert(tenant.id, casted)
      .then((products) => {
        // Store changed ids
        const ids = products.map((product) => product.id);

        // Remove all changed and concat new products
        setProducts((_products) =>
          _products.filter((_product) => !ids.includes(_product.id)).concat(products),
        );

        // Notify the user
        toast({
          title: "Productos actualizados",
          description: `${products.length} de tus productos fueron actualizados correctamente`,
          status: "success",
        });
      })
      .catch(() => {
        // If something failed, notify the user
        toast({
          title: "Error",
          description:
            "Hubo un error actualizando los productos, refrescá la página e intentá nuevamente",
          status: "error",
        });
      });
  }

  function remove(id: Product["id"]) {
    return api
      .remove(tenant.id, id)
      .then(() => {
        setProducts((products) => products.filter((product) => product.id !== id));

        toast({
          title: "Producto eliminado",
          description: "Tu producto fue eliminado correctamente",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description:
            "Hubo un error borrando el producto, refrescá la página e intentá nuevamente",
          status: "error",
        });
      });
  }

  const state: Context["state"] = {products};
  const actions: Context["actions"] = {
    create,
    update,
    remove,
    upsert,
  };

  return (
    <ProductContext.Provider value={{state, actions}}>
      {children}
      {isLimitWarningShown && <ProductLimitWarning onClose={closeLimitWarning} />}
    </ProductContext.Provider>
  );
};

export {ProductProvider as Provider, ProductContext as default};
