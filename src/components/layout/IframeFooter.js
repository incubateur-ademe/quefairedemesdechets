import React from "react";
import styled from "styled-components";

import Button from "components/base/Button";
import MagicLink from "components/base/MagicLink";
import MobileButtons from "./footer/MobileButtons";

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
`;
const Content = styled.div`
  max-width: ${(props) => props.theme.widths.maxWidthWithGutters};
  margin: 0 auto;
  padding: 1rem 0.5rem 0.5rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 1rem;
`;
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  background-color: white;
`;
const Institution = styled.img`
  display: block;
  height: 5.625em;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Content>
        <MobileButtons iframe />
        <ButtonWrapper>
          <Button to={process.env.GATSBY_URL}>
            En savoir plus sur ce simulateur
          </Button>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  );
}
