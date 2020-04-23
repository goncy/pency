import React from "react";
import shortid from "shortid";
import {Stack, Input, Button, IconButton} from "@chakra-ui/core";
import produce from "immer";

import {SingleOption, SingleOptionItem} from "../../types";

interface Props {
  value: SingleOption;
  onChange: (value: SingleOption) => void;
}

const SingleOptionInput: React.FC<Props> = ({value, onChange}) => {
  function handleChange(title: SingleOption["title"], index) {
    onChange(
      produce(value, (value) => {
        value.options[index].title = title;
      }),
    );
  }

  function handleAddOption() {
    onChange(
      produce(value, (value) => {
        value.options.push({
          id: shortid.generate(),
          title: "",
        });
      }),
    );
  }

  function handleRemoveOption(index) {
    onChange(
      produce(value, (value) => {
        delete value.options[index];
      }),
    );
  }

  function handleTitleChange(title: SingleOption["title"]) {
    onChange(
      produce(value, (value) => {
        value.title = title;
      }),
    );
  }

  return (
    <Stack spacing={3}>
      <Input
        placeholder="Título (ej: Salsa)"
        type="text"
        value={value.title}
        onChange={(event) => handleTitleChange(event.target.value)}
      />
      {value.options.map((option, index) => (
        <Stack key={index} isInline spacing={1}>
          <Input
            autoFocus
            value={option.title}
            onChange={(event) =>
              handleChange(event.target.value as SingleOptionItem["title"], index)
            }
          />
          <IconButton
            aria-label="Borrar sub opción"
            icon="delete"
            variant="ghost"
            variantColor="red"
            onClick={() => handleRemoveOption(index)}
          />
        </Stack>
      ))}
      <Button size="sm" variant="ghost" variantColor="primary" onClick={handleAddOption}>
        Agregar sub opción
      </Button>
    </Stack>
  );
};

export default SingleOptionInput;
