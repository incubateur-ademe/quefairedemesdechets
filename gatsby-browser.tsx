import React from "react";
import StyleProvider from "./src/components/providers/StyleProvider";
import ReactQueryProvider from "./src/components/providers/ReactQueryProvider";

export const wrapRootElement = ({ element }) => (
  <ReactQueryProvider>
    <StyleProvider>{element}</StyleProvider>
  </ReactQueryProvider>
);
