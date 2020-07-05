import React from "react";
import {Text, Stack, PseudoBox} from "@chakra-ui/core";
import styled from "@emotion/styled";

import Content from "./Content";

import Link from "~/ui/controls/Link";
import Image from "~/ui/feedback/Image";
import {useTranslation} from "~/i18n/hooks";
import {ClientTenant} from "~/tenant/types";
import ClearableTextField from "~/ui/inputs/ClearableTextField";
import {getDistance} from "~/utils/coordinates";

const EllipsisText = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface Props {
  tenants: ClientTenant[];
}

const Directory: React.FC<Props> = ({tenants}) => {
  const t = useTranslation();
  const [coordinates, setCoordinates] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const isGeolocationEnabled = "geolocation" in window.navigator;
  const filtered = React.useMemo(
    () =>
      tenants
        .filter(({location}) => {
          // If we don't have user coordinates, return everything
          if (!coordinates) {
            return true;
          }

          // If we have coordinates for this tenant
          if (location?.coordinates) {
            // Return true if the distance is below 25 KM
            return getDistance(coordinates, location.coordinates) <= 25;
          }

          // Otherwise return false
          return false;
        })
        .filter(({slug, title, category, location}) => {
          // If no query return all
          if (!query) {
            return true;
          }

          // Match slug
          if (slug.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
            return true;
          }

          // Match slug
          if (title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
            return true;
          }

          // Match category
          if (
            t(`catalogs.categories.${category}`)
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
          ) {
            return true;
          }

          // Match address
          if (
            location &&
            location.address.toLocaleLowerCase().includes(query.toLocaleLowerCase())
          ) {
            return true;
          }

          return false;
        }),
    [query, tenants, t, coordinates],
  );

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleQueryClear() {
    setQuery("");
  }

  function handleRemoveCoordinates() {
    setCoordinates(null);
  }

  function handleGetCoordinates() {
    // Get user current position
    navigator.geolocation.getCurrentPosition((position) => {
      // Store in on coordinates
      setCoordinates({lat: position.coords.latitude, lng: position.coords.longitude});
    });
  }

  return (
    <Content
      paddingBottom={{base: 12, sm: 4}}
      paddingTop={{base: 12, sm: 20}}
      textAlign={{base: "left", sm: "center"}}
      width="100%"
    >
      <Stack alignItems="center" spacing={{base: 4, sm: 6}}>
        <Stack spacing={1}>
          <Text
            as="h3"
            fontSize={{base: "2xl", md: "3xl", lg: "4xl", xl: "5xl"}}
            fontWeight={500}
            lineHeight="130%"
            maxWidth={{base: "auto", sm: "3xl", xl: "5xl"}}
          >
            {coordinates
              ? t("landing.directory.title.withLocation")
              : t("landing.directory.title.withoutLocation")}
          </Text>
          <Text
            as="h4"
            color="gray.400"
            fontSize={{md: "lg", lg: "xl", xl: "2xl"}}
            lineHeight={"130%"}
            maxWidth={{base: "auto", sm: "3xl", xl: "5xl"}}
          >
            {t("landing.directory.subtitle")}
          </Text>
        </Stack>
        <Stack
          borderColor="gray.100"
          borderWidth={1}
          boxShadow="xl"
          maxWidth={{base: "100%", sm: 480}}
          spacing={0}
          width="100%"
        >
          <ClearableTextField
            focusBorderColor="teal.100"
            placeholder={t("filters.search")}
            roundedBottom="none"
            value={query}
            variant="flushed"
            onChange={handleQueryChange}
            onClear={handleQueryClear}
          />
          <Stack maxHeight={480} overflowX="hidden" overflowY="auto" spacing={0} textAlign="left">
            {filtered.length ? (
              filtered.map(({title, logo, slug, category}) => (
                <Link
                  key={slug}
                  isExternal
                  _hover={{backgroundColor: "gray.50"}}
                  _notLast={{borderBottomWidth: 1}}
                  href={`/${slug}`}
                >
                  <PseudoBox padding={4} transition="background-color 0.25s">
                    <Stack isInline alignItems="center" spacing={2}>
                      <Image borderWidth={1} height={16} rounded="full" src={logo} width={16} />
                      <Stack overflow="hidden" spacing={0}>
                        <EllipsisText fontSize="lg" fontWeight={500} lineHeight="normal">
                          {title}
                        </EllipsisText>
                        <EllipsisText color="gray.500" lineHeight="normal" textAlign="left">
                          /{slug}
                        </EllipsisText>
                        <EllipsisText
                          color="teal.500"
                          fontSize="sm"
                          lineHeight="normal"
                          textAlign="left"
                        >
                          {t(`catalogs.categories.${category}`)}
                        </EllipsisText>
                      </Stack>
                    </Stack>
                  </PseudoBox>
                </Link>
              ))
            ) : (
              <Stack alignItems="center" color="gray.400" justifyContent="center" padding={4}>
                <Text>{t("landing.directory.noResults")}</Text>
              </Stack>
            )}
          </Stack>
        </Stack>
        {coordinates ? (
          <Text color="gray.400" fontSize="sm">
            {t("landing.directory.footer.withLocation")}
            <Link color="teal.400" fontSize="sm" marginLeft={1} onClick={handleRemoveCoordinates}>
              {t("landing.directory.footer.seeAll")}
            </Link>
          </Text>
        ) : (
          <Text color="gray.400" fontSize="sm">
            {t("landing.directory.footer.withoutLocation")}
            {isGeolocationEnabled && (
              <Link color="teal.400" fontSize="sm" marginLeft={1} onClick={handleGetCoordinates}>
                {t("landing.directory.footer.seeNear")}
              </Link>
            )}
          </Text>
        )}
      </Stack>
    </Content>
  );
};

export default Directory;
