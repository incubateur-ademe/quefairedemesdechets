import React from "react";

import Presentation from "./product/Presentation";
import Details from "./product/Details";
import Links from "./product/Links";
import { useLVAOMapForProduct } from "../utils/api";

export default function Product(props) {
  const { data, isFetching } = useLVAOMapForProduct(props.product.ID);

  return (
    <main>
      <Presentation product={props.product} />
      <Details product={props.product} lvaoData={data} isFetching={isFetching} />
      <Links product={props.product} />
    </main>
  );
}
