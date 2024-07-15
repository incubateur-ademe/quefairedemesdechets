import React from "react";
import styled from "styled-components";

import MagicLink from "components/base/MagicLink";
import Marianne from "components/base/Marianne";
import Ademe from "components/base/Ademe";

const Wrapper = styled.header`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 0.125rem;
  margin-bottom: 3rem;

  ${(props) => props.theme.mq.medium} {
    font-size: 0.75rem;
  }
`;
const Logos = styled(MagicLink)`
  display: flex;
  align-items: center;
  margin: 0 0.75rem 0 -0.75rem;
  background-color: #fff;
`;
export default function Header(props) {
  return (
    <Wrapper className={props.className}>
      {!props.noHeader && (
        <Logos
          to="/"
          aria-label="Que Faire de mes Déchets ? Retour à l’accueil"
          title="Que Faire de mes Déchets ? Retour à l’accueil"
        >
          <Marianne />
          <Ademe />
        </Logos>
      )}
      {props.children}
    </Wrapper>
  );
}
