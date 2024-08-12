import React from "react";
import styled from "styled-components";

import Map from "./details/Map";

const Section = styled.section`
  margin-bottom: 4rem;
`;
const Title = styled.h2`
  margin-bottom: 1.25rem;
`;
const Text = styled.p`
  font-size: 1.125rem;
`;
export default function Product({ lvaoData, product }) {
  return (
    <div>
      {product.map && (
        <Section>
          <Title>Où l'apporter ?</Title>

          <Map product={product} lvaoData={lvaoData} />
        </Section>
      )}
      {product[`Que_va-t-il_devenir_?`] && (
        <Section>
          <Title>Que va-t-il devenir ?</Title>
          <Text
            dangerouslySetInnerHTML={{
              __html: product[`Que_va-t-il_devenir_?`],
            }}
          />
        </Section>
      )}
      {product[`Comment_les_eviter_?`] && (
        <Section>
          <Title>Comment l'éviter ?</Title>
          <Text
            dangerouslySetInnerHTML={{
              __html: product[`Comment_les_eviter_?`],
            }}
          />
        </Section>
      )}
    </div>
  );
}
