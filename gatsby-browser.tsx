import React from "react";
import StyleProvider from "./src/components/providers/StyleProvider";
import ReactQueryProvider from "./src/components/providers/ReactQueryProvider";
import posthog from "posthog-js"

if (document.cookie.split("; ").find(row => row === "disable-posthog=1")) {
  posthog.capture("$set", {
    $set: {
      admin: "true"
    },
  })
}

const url = new URL(location.href)
if (url.searchParams.has("iframe")) {
  posthog.capture("$set", {
    $set: {
      iframe: "true"
    },
  })
}

export const wrapRootElement = ({ element }) => (
  <ReactQueryProvider>
    <StyleProvider>{element}</StyleProvider>
  </ReactQueryProvider>
);
