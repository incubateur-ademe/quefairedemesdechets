import React, { useContext } from "react";
import styled from "styled-components";

import UXContext from "utils/UXContext";
import MagicLink from "components/base/MagicLink";

const Text = styled.p``;
const Title = styled.h2``;
const StyledLink = styled.button`
  display: inline;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: transparent;
  border: none;
  cursor: pointer;
`;
export default function ContactPrompt(props) {
  const { setEmbedOpen } = useContext(UXContext);

  return (
    <>
      {!props.configurator && !props.contact && (
        <>
          <Title>
            Comment intégrer ces données à mon site ou application ?
          </Title>
          <Text>
            <strong>
              Vous souhaitez afficher ce simulateur sur votre site ?
            </strong>
            <br />
            Personnalisez le et intégrez le facilement grace à{" "}
            <StyledLink
              onClick={() => {
                setEmbedOpen(true);
              }}
            >
              notre configurateur
            </StyledLink>
            .
          </Text>
        </>
      )}
      {!props.contact && (
        <Text>
          <strong>Vous souhaitez réutiliser le code du simulateur ?</strong>
          <br />
          Ce simulateur est développé de manière ouverte (open source).
          L’ensemble du code est{" "}
          <MagicLink to="https://github.com/incubateur-ademe/quefairedemesdechets">
            disponible librement
          </MagicLink>
          .
        </Text>
      )}
    </>
  );
}
