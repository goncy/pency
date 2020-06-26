import React from "react";
import {Stack} from "@chakra-ui/core";

import Input from "../Input";

import api from "~/places/api/client";
import {useDebounce} from "~/hooks/time";
import {useToast} from "~/hooks/toast";
import {Place} from "~/places/types";
import Button from "~/ui/controls/Button";

interface Props {
  value?: Place;
  onChange: (value: Props["value"]) => void;
}

const PlaceInput: React.FC<Props> = ({value, onChange}) => {
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
      .search(query)
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
  }, [query, toast, address]);

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
          boxShadow="xl"
          left={0}
          maxHeight="200px"
          padding={2}
          position="absolute"
          top={10}
          width="100%"
        >
          {places.map((place, index) => (
            <Button
              key={index}
              alignItems="center"
              justifyContent="flex-start"
              paddingY={1}
              variant="link"
              onClick={() => handleChange(place)}
            >
              {place.address}
            </Button>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default PlaceInput;
