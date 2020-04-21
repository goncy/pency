import React from "react";
import {useForm, Controller} from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Stack,
  Select,
} from "@chakra-ui/core";

import {Product} from "../types";
import {useProductCategories} from "../hooks";

import ImageInput from "~/ui/inputs/Image";
import SwitchInput from "~/ui/inputs/Switch";

interface Props {
  defaultValues?: Product;
  onSubmit: (values: Product) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const DEFAULT_VALUES: Partial<Product> = {
  available: true,
  image: "",
};

const ProductForm: React.FC<Props> = ({defaultValues = DEFAULT_VALUES, children, onSubmit}) => {
  const {categories, subcategories} = useProductCategories();
  const {handleSubmit: submit, errors, register, formState, setValue, control} = useForm<Product>({
    defaultValues,
  });

  function handleSubmit(values: Product) {
    const product = {...defaultValues, ...values};

    product.category = product.category.trim();
    product.subcategory = product.subcategory?.trim();
    product.price = Number(product.price);

    return onSubmit(product);
  }

  function setCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue("category", event.target.value);
    event.target.value = "";
  }

  function setSubCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue("subcategory", event.target.value);
    event.target.value = "";
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <form onSubmit={submit(handleSubmit)}>
        <Stack spacing={{base: 3, sm: 6}}>
          <FormControl isRequired isInvalid={Boolean(errors.title)}>
            <FormLabel htmlFor="title">Título</FormLabel>
            <Input ref={register({required: true})} name="title" placeholder="Título" />
            <FormErrorMessage>
              {(errors.title && errors.title.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Descripción</FormLabel>
            <Input ref={register} name="description" placeholder="Descripción" />
            <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.category)}>
            <FormLabel htmlFor="category">Categoría</FormLabel>
            <Flex>
              <Input ref={register({required: true})} name="category" placeholder="Categoría" />
              <Select flexShrink={2} marginLeft={{base: 3, sm: 6}} onChange={setCategory}>
                <option value="">Cargar</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </Flex>
            <FormErrorMessage>
              {(errors.category && errors.category.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.subcategory)} mb={{base: 3, sm: 6}}>
            <FormLabel htmlFor="subcategory">Sub categoría</FormLabel>
            <Flex>
              <Input ref={register} name="subcategory" placeholder="Sub categoría" />
              <Select flexShrink={2} marginLeft={{base: 3, sm: 6}} onChange={setSubCategory}>
                <option value="">Cargar</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </Select>
            </Flex>
            <FormErrorMessage>
              {(errors.subcategory && errors.subcategory.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.price)} mb={{base: 3, sm: 6}}>
            <FormLabel htmlFor="price">Precio</FormLabel>
            <Input
              ref={register({required: true})}
              name="price"
              placeholder="Precio"
              type="number"
            />
            <FormErrorMessage>
              {(errors.price && errors.price.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.image)}>
            <FormLabel htmlFor="image">Imágen</FormLabel>
            <Controller as={ImageInput} control={control} defaultValue="" name="image" />
            <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.available)} mb={{base: 3, sm: 6}}>
            <FormLabel htmlFor="available">Disponible</FormLabel>
            <Controller
              as={SwitchInput}
              control={control}
              display="block"
              name="available"
              size="lg"
            />
            <FormErrorMessage>
              {(errors.available && errors.available.message) || "Este campo es requerido"}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </form>
    ),
  });
};

export default ProductForm;
