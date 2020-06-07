import React from "react";
import {useForm, Controller, FormContext} from "react-hook-form";
import {Stack} from "@chakra-ui/core";
import {produce} from "immer";

import FieldInput from "../inputs/Field";

import FormControl from "~/ui/controls/FormControl";
import {Field} from "~/tenant/types";

interface Props {
  defaultValues?: Field[];
  onSubmit: (values: Field[]) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

interface FormData {
  fields: string[];
}

const FieldsForm: React.FC<Props> = ({defaultValues, children, onSubmit}) => {
  const form = useForm<FormData>({
    defaultValues: {fields: defaultValues.map((field) => field.value)},
  });
  const {handleSubmit: submit, formState, control} = form;

  function handleSubmit(values: FormData) {
    return onSubmit(
      produce(defaultValues, (fields) => {
        fields.forEach((field, index) => {
          field.value = values.fields[index];
        });
      }),
    );
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={8}>
            {defaultValues.map((field, index) => {
              return (
                <FormControl key={field.id} name={`fields[${index}]`}>
                  <Controller
                    as={FieldInput}
                    control={control}
                    field={field}
                    name={`fields[${index}]`}
                  />
                </FormControl>
              );
            })}
          </Stack>
        </form>
      </FormContext>
    ),
  });
};

export default FieldsForm;
