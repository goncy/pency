import React from "react";
import {
  Stack,
  Link,
  IconButton as ChakraIconButton,
  StackProps,
  IconButtonProps,
} from "@chakra-ui/core";
import styled from "@emotion/styled";

import FacebookIcon from "../icons/Facebook";
import InstagramIcon from "../icons/Instagram";
import WhatsAppIcon from "../icons/WhatsApp";
import TwitterIcon from "../icons/Twitter";

interface Props extends StackProps {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

const IconButton = styled(ChakraIconButton)`
  min-width: auto;
  min-height: auto;

  padding: 6px;

  svg {
    max-height: 20px;
    max-width: 20px;
  }
`;

const SocialIcon: React.FC<IconButtonProps> = (props) => (
  <IconButton
    isRound
    height={{base: "34px", sm: "36px"}}
    variantColor="primary"
    width={{base: "34px", sm: "36px"}}
    {...props}
  />
);

const SocialLinks: React.FC<Props> = ({whatsapp, instagram, facebook, twitter, ...props}) => (
  <Stack isInline height={10} spacing={2} {...props}>
    {whatsapp && (
      <Link isExternal href={`https://wa.me/${whatsapp}`}>
        <SocialIcon aria-label="Enviar mensaje por WhatsApp" icon={WhatsAppIcon} />
      </Link>
    )}
    {instagram && (
      <Link isExternal href={`https://instagram.com/${instagram}`}>
        <SocialIcon aria-label="Ir a Instagram" icon={InstagramIcon} />
      </Link>
    )}
    {facebook && (
      <Link isExternal href={`https://facebook.com/${facebook}`}>
        <SocialIcon aria-label="Ir a Facebook" icon={FacebookIcon} />
      </Link>
    )}
    {twitter && (
      <Link isExternal href={`https://twitter.com/${twitter}`}>
        <SocialIcon aria-label="Ir a Twitter" icon={TwitterIcon} />
      </Link>
    )}
  </Stack>
);

export default SocialLinks;
