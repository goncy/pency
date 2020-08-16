import React from "react";
import {Flex, Box, Skeleton} from "@chakra-ui/core";

const ProductCardSkeleton: React.FC = () => {
  return (
    <>
      <Flex
        alignItems="flex-end"
        direction="column"
        justifyContent="space-between"
        position="relative"
        rounded="md"
      >
        <Box height={{base: 48, sm: 64}} rounded="md" width="100%">
          <Skeleton height="100%" width="100%" />
        </Box>
        <Box
          display="flex"
          flex={1}
          flexDirection="column"
          height="100%"
          justifyContent="space-between"
          // padding={{base: 2, sm: 4}}
          paddingTop={2}
          width="100%"
        >
          <Box
            height={{base: "24px", sm: "32px"}}
            maxWidth="200px"
            overflow="hidden"
            rounded="4px"
            width="80%"
          >
            <Skeleton height="100%" width="100%" />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ProductCardSkeleton;
