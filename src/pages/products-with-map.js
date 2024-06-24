import React from "react";
import { graphql } from "gatsby";

export const query = graphql`
  query AllPagesQuery {
    allSitePage {
      nodes {
        pageContext
      }
    }
  }
`;

function generateIframeUrl(productCategory) {
  return `https://lvao.ademe.fr/?iframe=&r=885&direction=jai&action_displayed=preter%7Cemprunter%7Clouer%7Cmettreenlocation%7Creparer%7Cdonner%7Cechanger%7Cacheter%7Crevendre&action_list=preter%7Cemprunter%7Clouer%7Cmettreenlocation%7Creparer%7Cdonner%7Cechanger%7Cacheter%7Crevendre&sous_categorie_objet=${productCategory}&preter=on&mettreenlocation=on&reparer=on&donner=on&echanger=on&revendre=on&emprunter=on&louer=on&echanger=on&acheter=on&digital=0&bounding_box=`;
}

export default function productsWithMap({ data }) {
  const productWithMap = data.allSitePage.nodes
    .filter(({ pageContext: { product } }) => !!product?.map)
    .map(({ pageContext: { product } }) => product);

  return (
    <>
      {productWithMap.map((product) => (
        <>
          {product.ID},{product.Nom},{generateIframeUrl(product.Nom)}
          {"\n"}
        </>
      ))}
    </>
  );
}
