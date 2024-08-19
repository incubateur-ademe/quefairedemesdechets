import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { GlobalStyle } from "utils/styles";
import ModalProvider from "components/providers/ModalProvider";
import UXProvider from "components/providers/UXProvider";
import SearchProvider from "components/providers/SearchProvider";
import ThemeToggle from "components/base/ThemeToggle";
import InstallButton from "components/base/InstallButton";
import HeaderWrapper from "components/wrappers/HeaderWrapper";
import FooterWrapper from "components/wrappers/FooterWrapper";
import ShareWrapper from "components/wrappers/ShareWrapper";
import EmbedWrapper from "components/wrappers/EmbedWrapper";
import ContactWrapper from "components/wrappers/ContactWrapper";
import Bin from "components/misc/Bin";
import Seo from "./web/Seo";
import ModalWrapper from "components/wrappers/ModalWrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column-reverse;
  }
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const FullScreen = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 65rem;
  max-width: 100%;
  min-height: ${(props) => (props.iframe ? "none" : "100vh")};
  margin: 0 auto;
  padding: 0 0.75rem 5rem;
`;

export default function Web(props) {
  const [iframe, setIframe] = useState(false);
  const [noHeader, setnoHeader] = useState(false);

  useEffect(() => {
    setIframe(window.location.search.includes("iframe"));
    setnoHeader(window.location.search.includes("noheader"));
  }, []);

  return (
    <Wrapper>
      <Seo title={props.title} />
      <UXProvider>
        <SearchProvider>
          <ModalProvider>
            <GlobalStyle />
            <ThemeToggle />
            <Content>
              <FullScreen iframe={iframe}>
                <HeaderWrapper noHeader={noHeader} />
                {props.children}
                <Bin />
              </FullScreen>
              <FooterWrapper iframe={iframe} />
            </Content>
            <EmbedWrapper result={props.result} />
            <ShareWrapper result={props.result} />
            {!iframe && <ContactWrapper />}
            <InstallButton />
            <ModalWrapper />
          </ModalProvider>
        </SearchProvider>
      </UXProvider>
    </Wrapper>
  );
}
