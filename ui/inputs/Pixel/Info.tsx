import React from "react";
import {Stack, Text, Code} from "@chakra-ui/core";

const Info: React.FC = () => (
  <Stack spacing={2}>
    <Text>El código de un pixel de Facebook se ve como algo así:</Text>
    <Code>
      {`<!-- Facebook Pixel Code -->
      <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '<TU_ID>');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=<TU_ID>&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Facebook Pixel Code -->`}
    </Code>
    <Text>Cuyo id podémos encontrar acá:</Text>
    <Stack isInline spacing={0}>
      <Text as="span">https://www.facebook.com/tr?id=</Text>
      <Text as="b">{`<TU_ID>`}</Text>
      <Text as="span">&ev=PageView&noscript=1</Text>
    </Stack>
  </Stack>
);

export default Info;
