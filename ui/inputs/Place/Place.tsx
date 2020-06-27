import React from "react";
import {Stack, Text, PseudoBox} from "@chakra-ui/core";

import Input from "../Input";

import api from "~/places/api/client";
import {useDebounce} from "~/hooks/time";
import {useToast} from "~/hooks/toast";
import {Place} from "~/places/types";

interface Props {
  value?: Place;
  onChange: (value: Props["value"]) => void;
  country: string;
}

const PlaceInput: React.FC<Props> = ({value, onChange, country}) => {
  const [query, setQuery] = React.useState(value?.address || "");
  const [isLoading, setLoading] = React.useState(false);
  const [places, setPlaces] = React.useState<Place[]>([]);
  const toast = useToast();
  const address = value?.address;

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleChange(place: Place) {
    onChange(place);
    setPlaces([]);
    setQuery(place.address);
  }

  const getPlaces = React.useCallback(() => {
    if (query === address) return;

    setLoading(true);
    setPlaces([]);

    api
      .search(query, country)
      .then((places) => {
        setPlaces(places || []);
        setLoading(false);
      })
      .catch(() => {
        toast({
          status: "warning",
          title: "Oops",
          description: "Hubo un error obteniendo las ubicaciónes, intentá de nuevo mas tarde",
        });
        setLoading(false);
      });
  }, [query, toast, address, country]);

  useDebounce(getPlaces, 1000, query);

  return (
    <Stack position="relative">
      <Input
        isDisabled={isLoading}
        style={{marginBottom: 0}}
        value={query}
        onChange={handleQueryChange}
      />
      {Boolean(places?.length) && (
        <Stack
          backgroundColor="white"
          borderRadius="md"
          boxShadow="xl"
          left={0}
          maxHeight="250px"
          overflowX="hidden"
          overflowY="auto"
          position="absolute"
          spacing={0}
          top={10}
          width="100%"
          zIndex={3}
        >
          {places.map((place, index) => (
            <PseudoBox
              key={index}
              _hover={{backgroundColor: "gray.50"}}
              _notLast={{borderBottomWidth: 1}}
              paddingY={2}
            >
              <Text
                alignItems="center"
                color="gray.700"
                cursor="pointer"
                fontSize="sm"
                fontWeight={500}
                justifyContent="flex-start"
                paddingX={3}
                onClick={() => handleChange(place)}
              >
                {place.address}
              </Text>
            </PseudoBox>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default PlaceInput;
