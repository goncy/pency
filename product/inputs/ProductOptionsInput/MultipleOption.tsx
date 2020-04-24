import React from "react";
import shortid from "shortid";
import {Stack, Input, Button, IconButton, FormLabel} from "@chakra-ui/core";
import produce from "immer";

import {MultipleOption} from "../../types";

import FormControl from "~/ui/controls/FormControl";
interface Props {
  index: number;
  error?: string;
  value: Partial<MultipleOption>;
  onChange: (option: Partial<MultipleOption>) => void;
}

const MultipleOptionInput: React.FC<Props> = ({error, value, onChange}) => {
  function handleChange(subindex, title) {
    onChange(
      produce(value, (value) => {
        value.options[subindex].title = title;
      }),
    );
  }

  function handleChangeTitle(event) {
    onChange(
      produce(value, (value) => {
        value.title = event.target.value;
      }),
    );
  }

  function handleChangeCount(event) {
    onChange(
      produce(value, (value) => {
        value.count = Number(event.target.value || 0);
      }),
    );
  }

  function handleAdd() {
    onChange(
      produce(value, (value) => {
        value.options.push({id: shortid.generate(), title: ""});
      }),
    );
  }

  function handleRemove(subindex) {
    onChange(
      produce(value, (value) => {
        value.options.splice(subindex, 1);
      }),
    );
  }

  return (
    <Stack spacing={3}>
      <FormControl
        isRequired
        error={error === "title" && !value.title && "Este campo es requerido"}
        help="Tip: Usá una sola palabra"
        label="Título"
      >
        <Input
          placeholder="Título (ej: Salsa)"
          type="text"
          value={value.title}
          onChange={handleChangeTitle}
        />
      </FormControl>
      <FormControl
        isRequired
        error={
          (error === "optionsCount" &&
            value.count > value.options?.length &&
            "No puede haber menos opción que selecciones") ||
          (error === "count" && !value.count && "Este campo es requerido")
        }
        help="Cantidad de opciónes que el usuario puede seleccionar"
        label="Cantidad"
      >
        <Input
          placeholder="2"
          type="number"
          value={value.count || ""}
          onChange={handleChangeCount}
        />
      </FormControl>
      {value.options.length && <FormLabel marginBottom={0}>Sub opciones</FormLabel>}
      {value.options.map((option, subindex) => (
        <Stack key={option.id} isInline spacing={1}>
          <FormControl
            error={error === "options" && !option.title && "Este campo es requerido"}
            width="100%"
          >
            <Input
              autoFocus
              value={option.title}
              onChange={(event) => handleChange(subindex, event.target.value)}
            />
          </FormControl>
          {value.options.length > value.count && (
            <IconButton
              aria-label="Borrar sub opción"
              icon="delete"
              variant="ghost"
              variantColor="red"
              onClick={() => handleRemove(subindex)}
            />
          )}
        </Stack>
      ))}
      <Button size="sm" variant="ghost" variantColor="primary" onClick={handleAdd}>
        Agregar sub opción
      </Button>
    </Stack>
  );
};

export default MultipleOptionInput;
