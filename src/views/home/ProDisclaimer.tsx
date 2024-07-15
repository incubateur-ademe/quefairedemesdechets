import React from "react";
import Accordion from "components/base/Accordion";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 1rem;
`

export default function ProDisclaimer() {
  return (
    <Wrapper>
      <Accordion items={[{ title: "Je suis un professionnel", content: "Actuellement, l’ensemble des recommandations ne concerne que les particuliers. " }]} />
    </Wrapper>
  );
}
