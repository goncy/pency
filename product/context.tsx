import React from "react";

import {Product} from "./types";
import api from "./api/client";
import {filterByPriceChanged} from "./selectors";

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
    bulk: {
      update: (products: Product[]) => Promise<void>;
    };
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

  function create(product: Product) {
    return api
      .create(tenant.id, product)
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
    return api
      .update(tenant.id, product)
      .then(() => {
        setProducts((products) =>
          products.map((_product) => (_product.id === product.id ? product : _product)),
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

  function bulkUpdate(changed: Product[]) {
    const diff = filterByPriceChanged(changed, products);

    return api.bulk
      .update(tenant.id, diff)
      .then(() => {
        diff.forEach((product) => {
          setProducts((products) =>
            products.map((_product) => (_product.id === product.id ? product : _product)),
          );
        });

        toast({
          title: "Productos actualizados",
          description: `${diff.length} de tus productos fueron actualizados correctamente`,
          status: "success",
        });
      })
      .catch(() => {
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
    bulk: {
      update: bulkUpdate,
    },
  };

  return <ProductContext.Provider value={{state, actions}}>{children}</ProductContext.Provider>;
};

export {ProductProvider as Provider, ProductContext as default};
