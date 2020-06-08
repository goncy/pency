import React from "react";
import {Image, Stack, Tag, TagLabel} from "@chakra-ui/core";

interface Props {
  title: string;
  image: string;
}

const Preview: React.FC<Props> = ({title, image}) => {
  const [isHovered, toggleHover] = React.useState(false);

  return (
    <Stack
      alignItems="center"
      spacing={4}
      onMouseOut={() => toggleHover(false)}
      onMouseOver={() => toggleHover(true)}
    >
      <Tag
        backgroundColor={isHovered ? "teal.100" : "teal.50"}
        rounded="full"
        size="lg"
        transition="background-color .25s"
        variant="solid"
      >
        <TagLabel color="teal.900">{title}</TagLabel>
      </Tag>
      <Image
        alt="Panaderias"
        boxShadow={isHovered ? "lg" : "none"}
        src={image}
        transform={isHovered ? "translateY(-4px)" : ""}
        transition="all .25s"
      />
    </Stack>
  );
};

export default Preview;
