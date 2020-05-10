import React from "react";
import {useForm, Controller, FormContext} from "react-hook-form";
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
import ProductOptionsInput, {
  validator as ProductOptionsInputValidator,
} from "../inputs/ProductOptionsInput";

import ImageInput from "~/ui/inputs/Image";
import SwitchInput from "~/ui/inputs/Switch";

interface Props {
  defaultValues?: Partial<Product>;
  onSubmit: (values: Partial<Product>) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const DEFAULT_VALUES: Partial<Product> = {
  available: true,
  image: "",
  options: [],
};

const ProductForm: React.FC<Props> = ({defaultValues = DEFAULT_VALUES, children, onSubmit}) => {
  const {categories, subcategories} = useProductCategories();
  const form = useForm<Partial<Product>>({defaultValues});
  const {handleSubmit: submit, errors, register, formState, setValue, control} = form;

  function handleSubmit(values: Partial<Product>) {
    const product = {...defaultValues, ...values};

    product.category = product.category.trim();
    product.subcategory = product.subcategory?.trim();
    product.price = Number(product.price);
    product.options = product.options || [];

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
      <FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={4}>
            <FormControl isRequired isInvalid={Boolean(errors.title)}>
              <FormLabel htmlFor="title">Título</FormLabel>
              <Input ref={register({required: true})} autoFocus name="title" placeholder="Título" />
              <FormErrorMessage>
                {(errors.title && errors.title.message) || "Este campo es requerido"}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Input ref={register} name="description" placeholder="Descripción" />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={Boolean(errors.category)}>
              <FormLabel htmlFor="category">Categoría</FormLabel>
              <Flex>
                <Input ref={register({required: true})} name="category" placeholder="Categoría" />
                <Select flexShrink={2} marginLeft={4} onChange={setCategory}>
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
            <FormControl isInvalid={Boolean(errors.subcategory)} mb={4}>
              <FormLabel htmlFor="subcategory">Sub categoría</FormLabel>
              <Flex>
                <Input ref={register} name="subcategory" placeholder="Sub categoría" />
                <Select flexShrink={2} marginLeft={4} onChange={setSubCategory}>
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
            <FormControl isRequired isInvalid={Boolean(errors.price)} mb={4}>
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
            <FormControl mb={4}>
              <FormLabel htmlFor="options">Opciones</FormLabel>
              <Controller
                as={ProductOptionsInput}
                control={control}
                name="options"
                rules={{
                  validate: ProductOptionsInputValidator,
                }}
              />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.image)}>
              <FormLabel htmlFor="image">Imágen</FormLabel>
              <Controller
                as={ImageInput}
                control={control}
                defaultValue=""
                format="jpg"
                name="image"
              />
              <FormErrorMessage>{errors.image && errors.image.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.available)} mb={4}>
              <FormLabel htmlFor="available">En stock</FormLabel>
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
            <FormControl isInvalid={Boolean(errors.featured)} mb={4}>
              <FormLabel htmlFor="featured">Destacado</FormLabel>
              <Controller
                as={SwitchInput}
                control={control}
                defaultValue={false}
                display="block"
                name="featured"
                size="lg"
              />
              <FormErrorMessage>
                {(errors.featured && errors.featured.message) || "Este campo es requerido"}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </form>
      </FormContext>
    ),
  });
};

export default ProductForm;
