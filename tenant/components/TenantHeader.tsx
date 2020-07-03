import React from "react";
import {Grid, Stack, Text, Box, BoxProps} from "@chakra-ui/core";

import {ClientTenant} from "../types";

import TenantAvatar from "./TenantAvatar";

import SocialLinks from "~/ui/list/SocialLinks";
import MarkerIcon from "~/ui/icons/Marker";
import Link from "~/ui/controls/Link";

interface Props extends BoxProps {
  tenant: Pick<
    ClientTenant,
    | "banner"
    | "facebook"
    | "instagram"
    | "twitter"
    | "logo"
    | "title"
    | "description"
    | "phone"
    | "location"
  >;
}

const TenantHeader: React.FC<Props> = ({
  tenant: {banner, facebook, instagram, twitter, logo, title, description, phone, location},
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
      roundedBottom={{base: "none", sm: "lg"}}
      width="100%"
    />
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
        <TenantAvatar
          gridArea="avatar"
          logo={logo}
          marginRight={{base: 0, sm: 4}}
          marginTop={{base: -6, sm: -8}}
          title={title}
        />
        <Stack gridArea="information" marginTop={{base: 1, sm: 4}} spacing={{base: 0, sm: 1}}>
          <Text as="h1" fontSize={{base: "xl", sm: "3xl"}} fontWeight="bold" lineHeight="normal">
            {title}
          </Text>
          <Text color="gray.500" fontSize={{base: "sm", sm: "md"}} lineHeight="tall">
            {description}
          </Text>
          {location && (
            <Stack isInline alignItems="center" color="primary.500" marginTop={1} spacing={1}>
              <MarkerIcon minWidth={4} size={4} />
              <Link
                isExternal
                href={`https://www.google.com.ar/maps/place/${location.address}/@${location.coordinates.lat},${location.coordinates.lng}`}
              >
                <Text fontSize={{base: "sm", sm: "md"}} lineHeight="tall">
                  {location.address.length > 50
                    ? location.address.slice(0, 47).concat("...")
                    : location.address}
                </Text>
              </Link>
            </Stack>
          )}
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
  </Box>
);

export default TenantHeader;
