import {useToast as useChakraToast, useToastOptions} from "@chakra-ui/core";

type ToastOptions = Pick<useToastOptions, "title" | "description" | "status">;

export function useToast() {
  const toast = useChakraToast();

  return ({title, description, status}: ToastOptions) =>
    toast({
      title,
      description,
      status,
      position: "top-right",
      duration: 3000,
      isClosable: true,
    });
}
