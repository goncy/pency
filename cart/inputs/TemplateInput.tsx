import React from "react";
import {Stack, Button} from "@chakra-ui/core";

import Textarea from "~/ui/inputs/Textarea";

interface Props {
  value?: string;
  tokens?: string[];
  onChange: (template: string) => void;
}

const TemplateInput: React.FC<Props> = ({value, tokens = [], onChange}) => {
  const message = React.useRef<HTMLInputElement>();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    return onChange(event.target.value);
  }

  function insertToken(token: string) {
    const selection = message.current;

    if (selection) {
      const cursorPosition = selection.selectionStart;
      const before = selection.value.substring(0, cursorPosition);
      const after = selection.value.substring(cursorPosition, selection.value.length);
      const endCursorPosition = cursorPosition + token.length + 4;

      onChange(`${before}{{${token}}}${after}`);

      setTimeout(() => {
        selection.focus();
        selection.setSelectionRange(endCursorPosition, endCursorPosition);
      }, 0);
    }
  }

  return (
    <Stack position="relative" spacing={2}>
      <Textarea ref={message} minHeight={48} value={value} onChange={handleChange} />
      <Stack isInline overflowX="auto" spacing={2}>
        {tokens.map((token, id) => (
          <Button key={id} size="sm" onClick={() => insertToken(token)}>
            {token}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default TemplateInput;
