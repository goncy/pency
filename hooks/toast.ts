import React from "react";
import {useToast as useChakraToast, useToastOptions} from "@chakra-ui/core";

type ToastOptions = Pick<useToastOptions, "title" | "description" | "status">;

export function useToast() {
  const toast = useChakraToast();

  return React.useCallback(
    ({title, description, status}: ToastOptions) =>
      toast({
        title,
        description,
        status,
        position: "top-right",
        duration: 3000,
        isClosable: true,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
