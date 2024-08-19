import React from "react";
import StyleProvider from "./src/components/providers/StyleProvider";
import ReactQueryProvider from "./src/components/providers/ReactQueryProvider";

import * as Sentry from "@sentry/gatsby";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export const wrapRootElement = ({ element }) => (
  <ReactQueryProvider>
    <StyleProvider>{element}</StyleProvider>
  </ReactQueryProvider>
);
