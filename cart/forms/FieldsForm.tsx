import React from "react";
import {useForm, Controller, FormContext} from "react-hook-form";
import {Stack} from "@chakra-ui/core";

import FieldInput, {validator as FieldInputValidator} from "../inputs/Field";

import FormControl from "~/ui/controls/FormControl";
import {Field as TenantField} from "~/tenant/types";
import {CheckoutFields} from "~/cart/types";

interface Props {
  defaultValues?: CheckoutFields;
  fields: TenantField[];
  onSubmit: (values: CheckoutFields) => void;
  children: (options: {
    form: JSX.Element;
    isLoading: boolean;
    submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  }) => JSX.Element;
}

const FieldsForm: React.FC<Props> = ({defaultValues, children, onSubmit, fields}) => {
  const form = useForm<Partial<any>>({defaultValues});
  const {handleSubmit: submit, errors, formState, control} = form;

  function handleSubmit(fields: CheckoutFields) {
    return onSubmit(fields);
  }

  return children({
    isLoading: formState.isSubmitting,
    submit: submit(handleSubmit),
    form: (
      <FormContext {...form}>
        <form onSubmit={submit(handleSubmit)}>
          <Stack spacing={8}>
            {fields.map((field) => {
              return (
                <FormControl key={field.id} name={field.title}>
                  <Controller
                    as={FieldInput}
                    control={control}
                    error={errors[field.title]}
                    field={field}
                    name={field.title}
                    rules={{
                      validate: FieldInputValidator,
                    }}
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
