import React from "react";
import {useForm, Controller} from "react-hook-form";
import {Stack} from "@chakra-ui/core";
import {produce} from "immer";

import FieldInput, {validator as FieldInputValidator} from "../inputs/Field";

import FormControl from "~/ui/form/FormControl";
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
  const {handleSubmit: submit, formState, control, errors} = useForm<FormData>({
    defaultValues: {fields: defaultValues.map((field) => field.value)},
  });

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
      <form onSubmit={submit(handleSubmit)}>
        <Stack spacing={8}>
          {defaultValues.map((field, index) => {
            const error = errors.fields?.[index]?.message;

            return (
              <FormControl
                key={field.id}
                error={error}
                isRequired={field.required}
                name={`fields[${index}]`}
              >
                <Controller
                  as={FieldInput}
                  control={control}
                  field={field}
                  name={`fields[${index}]`}
                  rules={{
                    validate: FieldInputValidator(field),
                  }}
                />
              </FormControl>
            );
          })}
        </Stack>
      </form>
    ),
  });
};

export default FieldsForm;
