import React from "react";
import {Stack, Link, IconButton, StackProps} from "@chakra-ui/core";

import FacebookIcon from "../icons/Facebook";
import InstagramIcon from "../icons/Instagram";
import WhatsAppIcon from "../icons/WhatsApp";
import TwitterIcon from "../icons/Twitter";

interface Props extends StackProps {
  whatsapp?: number;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

const SocialLinks: React.FC<Props> = ({whatsapp, instagram, facebook, twitter, ...props}) => (
  <Stack isInline height={10} spacing={3} {...props}>
    {whatsapp && (
      <Link isExternal href={`https://wa.me/${whatsapp}`}>
        <IconButton
          aria-label="Enviar mensaje por WhatsApp"
          icon={WhatsAppIcon}
          rounded="50%"
          variantColor="primary"
        />
      </Link>
    )}
    {instagram && (
      <Link isExternal href={`https://instagram.com/${instagram}`}>
        <IconButton
          aria-label="Ir a Instagram"
          icon={InstagramIcon}
          rounded="50%"
          variantColor="primary"
        />
      </Link>
    )}
    {facebook && (
      <Link isExternal href={`https://facebook.com/${facebook}`}>
        <IconButton
          aria-label="Ir a Facebook"
          icon={FacebookIcon}
          rounded="50%"
          variantColor="primary"
        />
      </Link>
    )}
    {twitter && (
      <Link isExternal href={`https://twitter.com/${twitter}`}>
        <IconButton
          aria-label="Ir a Twitter"
          icon={TwitterIcon}
          rounded="50%"
          variantColor="primary"
        />
      </Link>
    )}
  </Stack>
);

export default SocialLinks;
