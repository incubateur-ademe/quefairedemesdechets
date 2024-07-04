import React from "react";
import StyleProvider from "./src/components/providers/StyleProvider";
import ReactQueryProvider from "./src/components/providers/ReactQueryProvider";

export.wrapRootElement = ({ element }) => (
  <StyleProvider>{element}</StyleProvider>
);
