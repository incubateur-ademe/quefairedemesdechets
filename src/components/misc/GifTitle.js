import React from "react";
import styled from "styled-components";

import MagicLink from "components/base/MagicLink";
import qfdmodGif from "./images/qfdmod.gif";
import qfdmodSmallGif from "./images/qfdmod_small.gif";

const StyledMagicLink = styled(MagicLink)`
  text-decoration: none;
`;
const Wrapper = styled.h1`
  position: relative;
  margin-bottom: ${(props) => (props.small ? 0 : 2.5)}rem;
  text-align: center;
`;

export default function GifTitle(props) {
  return (
    <StyledMagicLink
      to="/"
      title="Que Faire de mes Déchets ? Retour à l’accueil"
    >
      <Wrapper small={props.small} as="h1">
        <span hidden>Que faire de mes Objets et de mes Déchets</span>
        <img
          src={props.small ? qfdmodSmallGif : qfdmodGif}
          alt="Que faire de mes Objets et de mes Déchets"
          style={{
            width: props.small ? "auto" : "100%",
            maxWidth: props.small ? "100%" : "500px",
            maxHeight: "60px",
          }}
        />
      </Wrapper>
    </StyledMagicLink>
  );
}
