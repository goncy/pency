import React from "react";
import {Flex, Box, Skeleton, Grid, Stack} from "@chakra-ui/core";

import Content from "~/ui/structure/Content";

const HeaderSkeleton: React.FC = () => {
  return (
    <Flex direction="column" height="100%">
      <Flex as="main" backgroundColor="white" direction="column" flex={1} height="100%">
        <Content height="100%" paddingX={{base: 0, sm: 4}}>
          <Box marginBottom={4}>
            <Box
              height={{base: 24, sm: 56}}
              minHeight={{base: 24, sm: 56}}
              overflow="hidden"
              roundedBottom={{base: "none", sm: "lg"}}
              width="100%"
            >
              <Skeleton height="100%" width="100%" />
            </Box>
            <Box paddingX={4}>
              <Grid
                gridTemplateAreas={{
                  base: `"avatar links" "information information"`,
                  sm: `"avatar information links"`,
                }}
                gridTemplateColumns={{
                  base: `auto`,
                  sm: `auto 1fr auto`,
                }}
                width="100%"
              >
                <Box
                  backgroundColor="white"
                  boxShadow="inset 0 0 2px rgba(0,0,0,0.2), 0px 0px 0px 3px white"
                  gridArea="avatar"
                  height={{base: 24, sm: 32}}
                  marginRight={{base: 0, sm: 4}}
                  marginTop={{base: -6, sm: -8}}
                  minHeight={{base: 24, sm: 32}}
                  minWidth={{base: 24, sm: 32}}
                  overflow="hidden"
                  rounded="50%"
                  width={{base: 24, sm: 32}}
                  zIndex={1}
                >
                  <Skeleton height="100%" width="100%" />
                </Box>
                <Stack
                  gridArea="information"
                  marginTop={{base: 1, sm: 4}}
                  spacing={{base: 0, sm: 1}}
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
                  <Box
                    height={{base: "22px", sm: "24px"}}
                    marginTop="0.4rem"
                    maxWidth="250px"
                    overflow="hidden"
                    rounded="4px"
                    width="100%"
                  >
                    <Skeleton height="100%" width="100%" />
                  </Box>
                </Stack>
                <Stack
                  isInline
                  gridArea="links"
                  height={10}
                  justifyContent="flex-end"
                  marginTop={4}
                  spacing={2}
                >
                  <Skeleton height="36px" rounded="50%" width="36px" />
                  <Skeleton height="36px" rounded="50%" width="36px" />
                  <Skeleton height="36px" rounded="50%" width="36px" />
                  <Skeleton height="36px" rounded="50%" width="36px" />
                </Stack>
              </Grid>
            </Box>
          </Box>
        </Content>
      </Flex>
    </Flex>
  );
};

export default HeaderSkeleton;
