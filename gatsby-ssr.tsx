import React from "react";
import StyleProvider from "./src/components/providers/StyleProviderSSR";
import ReactQueryProvider from "./src/components/providers/ReactQueryProvider";

export const onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
) => {
  const posthogOptions = {
    apiKey: process.env.POSTHOG_API_KEY,
    apiHost: "https://eu.i.posthog.com",
    head: true,
    isEnabledDevMode: false,
    initOptions: {
      persistence: "memory",
    },
  };
  const isEnabled =
    process.env.NODE_ENV === "production" || posthogOptions.isEnabledDevMode;
  if (!isEnabled) {
    console.log("Posthog Analytics not enabled");
    return null;
  }
  const posthogScript = (
    <script
      key={`gatsby-plugin-posthog-analytics`}
      dangerouslySetInnerHTML={{
        __html: `
 !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${posthogOptions.apiKey}', {api_host: '${posthogOptions.apiHost}'})
          `,
      }}
    />
  );
  if (posthogOptions.head) {
    setHeadComponents([posthogScript]);
  } else {
    setPostBodyComponents([posthogScript]);
  }
  return null;
};

export const wrapRootElement = ({ element }) => (
  <ReactQueryProvider>
    <StyleProvider>{element}</StyleProvider>
  </ReactQueryProvider>
);
