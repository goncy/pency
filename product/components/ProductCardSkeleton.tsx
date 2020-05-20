import React from "react";
import {Flex, Skeleton, useTheme} from "@chakra-ui/core";

export default function ProductCardSkeleton() {
  const theme = useTheme();

  const skeletonProps = {
    colorStart: theme.colors.gray["10"],
    colorEnd: theme.colors.gray["200"],
  };

  return (
    <Flex
      borderBottomWidth={1}
      borderColor={{
        base: "gray.100",
        md: "gray.200",
      }}
      borderRadius={{
        md: "md",
      }}
      borderWidth={{
        md: 1,
      }}
      pb={{
        base: 5,
        md: 0,
      }}
    >
      <Flex direction="column" flexGrow={1} pr={{base: 10, md: 6}} px={{md: 6}} py={{md: 5}}>
        <Skeleton
          {...skeletonProps}
          height={{
            base: "17px",
            height: "21px",
          }}
          mb={2}
          width="210px"
        />
        <Skeleton {...skeletonProps} height="42px" mb={3} width="100%" />
        <Skeleton {...skeletonProps} height="21px" width="40px" />
      </Flex>
      <Skeleton
        {...skeletonProps}
        flexShrink={0}
        ml={3}
        size={{
          base: 20,
          md: 40,
        }}
      />
    </Flex>
  );
}
