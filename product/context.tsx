import React from "react";

import {Context, State, Actions} from "./types/context";
import {Product} from "./types/product";
import api from "./api";

import {useToast} from "~/hooks/toast";
import {useTenant} from "~/tenant/hooks";
import {sortBy} from "~/selectors/sort";

interface Props {
  initialValues: Product[];
}

const ProductContext = React.createContext({} as Context);

const ProductProvider: React.FC<Props> = ({initialValues, children}) => {
  const tenant = useTenant();
  const toast = useToast();
  const [products, setProducts] = React.useState<Product[]>(
    sortBy(initialValues, (item) => item.title),
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

  const state: State = {products};
  const actions: Actions = {create, update, remove};

  return <ProductContext.Provider value={{state, actions}}>{children}</ProductContext.Provider>;
};

export {ProductProvider as Provider, ProductContext as default};
