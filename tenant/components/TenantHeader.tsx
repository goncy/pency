import React from "react";
import {Grid, Stack, Text, Box, GridProps, BoxProps} from "@chakra-ui/core";

import {Tenant} from "../types";

import TenantAvatar from "./TenantAvatar";

import SocialLinks from "~/ui/list/SocialLinks";

interface Props extends BoxProps {
  tenant: Pick<
    Tenant,
    "banner" | "facebook" | "instagram" | "twitter" | "logo" | "title" | "description" | "phone"
  >;
  headerProps?: BoxProps;
  contentProps?: GridProps;
}

const TenantHeader: React.FC<Props> = ({
  headerProps = {},
  contentProps = {},
  tenant: {banner, facebook, instagram, twitter, logo, title, description, phone},
  ...props
}) => (
  <Box {...props}>
    <Box
      backgroundColor="primary.500"
      backgroundImage={`url(${banner})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      height={{base: 24, sm: 56}}
      minHeight={{base: 24, sm: 56}}
      width="100%"
      {...headerProps}
    />
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
      {...contentProps}
    >
      <TenantAvatar
        gridArea="avatar"
        logo={logo}
        marginRight={{base: 0, sm: 4}}
        marginTop={{base: -6, sm: -8}}
        title={title}
      />
      <Stack gridArea="information" marginTop={{base: 1, sm: 4}} spacing={{base: 0, sm: 1}}>
        <Text fontSize={{base: "xl", sm: "3xl"}} fontWeight="bold" lineHeight="normal">
          {title}
        </Text>
        <Text color="gray.500" fontSize={{base: "sm", sm: "md"}} lineHeight="tall">
          {description}
        </Text>
      </Stack>
      <SocialLinks
        facebook={facebook}
        gridArea="links"
        instagram={instagram}
        justifyContent="flex-end"
        marginTop={4}
        twitter={twitter}
        whatsapp={phone}
      />
    </Grid>
  </Box>
);

export default TenantHeader;
