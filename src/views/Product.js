import React from "react";

import Presentation from "./product/Presentation";
import Details from "./product/Details";
import DetailsMobile from "./product/DetailsMobile";
import Links from "./product/Links";
import MapModal from "components/modals/MapModal";
import AvoidModal from "components/modals/AvoidModal";
import NextModal from "components/modals/NextModal";
import { useQuery } from "@tanstack/react-query";

const LVAO_API = `${process.env.LVAO_BASE_URL}/api`;

export default function Product(props) {
  const response = useQuery(["response"], async () => {
    return await fetch(
      `${LVAO_API}/qfdmd/afficher_carte?id=${props.product.ID}`,
    ).json();
  });

  console.log({ response });

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
