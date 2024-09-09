import React from "react";
import Accordion from "components/base/Accordion";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Wrapper = styled.div`
  margin-top: 1rem;
  opacity: 0;
  animation: ${fadeIn} .5s ease-in-out;
  animation-delay: 1s;
  animation-fill-mode: forwards;
`


export default function ProDisclaimer() {
  return (
    <Wrapper>
      <Accordion items={[{ title: "Je suis un professionnel", content: <p>Actuellement, l’ensemble des recommandations ne concerne que les particuliers. Pour des informations à destination des professionnels, veuillez consulter le site <a href="https://economie-circulaire.ademe.fr/dechets-activites-economiques" target="_blank">https://economie-circulaire.ademe.fr/dechets-activites-economiques</a>.</p> }]} />
    </Wrapper>
  );
}
