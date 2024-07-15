import React from "react";

import Presentation from "./product/Presentation";
import Details from "./product/Details";
import DetailsMobile from "./product/DetailsMobile";
import Links from "./product/Links";
import MapModal from "components/modals/MapModal";
import AvoidModal from "components/modals/AvoidModal";
import NextModal from "components/modals/NextModal";
import { useLVAOMapForProduct } from "../utils/api";

export default function Product(props) {
  const { data } = useLVAOMapForProduct(props.product.ID);

  return (
    <main>
      <Presentation product={props.product} />
      <Details product={props.product} />
      <DetailsMobile product={props.product} />
      <Links product={props.product} />
      <MapModal />
      <AvoidModal />
      <NextModal />
    </main>
  );
}
