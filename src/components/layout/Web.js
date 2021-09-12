import React from 'react'
import styled from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyle } from 'utils/styles'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import SearchProvider from 'components/providers/SearchProvider'
import CO2EModal from 'components/modals/CO2EModal'
import MapModal from 'components/modals/MapModal'
import AvoidModal from 'components/modals/AvoidModal'
import NextModal from 'components/modals/NextModal'
import ThemeToggle from 'components/base/ThemeToggle'
import InstallButton from 'components/base/InstallButton'
import HeaderWrapper from 'components/wrappers/HeaderWrapper'
import FooterWrapper from 'components/wrappers/FooterWrapper'
import ShareWrapper from 'components/wrappers/ShareWrapper'
import EmbedWrapper from 'components/wrappers/EmbedWrapper'
import ContactWrapper from 'components/wrappers/ContactWrapper'
import Bin from 'components/misc/Bin'
import Seo from './web/Seo'

const queryClient = new QueryClient()

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${(props) => props.theme.mq.medium} {
    flex-direction: column-reverse;
  }
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const FullScreen = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 46.5rem;
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 0.75rem 5rem;
`
export default function Web(props) {
  return (
    <Wrapper>
      <Seo title={props.title} />
      <QueryClientProvider client={queryClient}>
        <UXProvider>
          <SearchProvider>
            <ModalProvider>
              <GlobalStyle />
              <ThemeToggle />
              <Content>
                <FullScreen>
                  <HeaderWrapper />
                  {props.children}
                  <Bin />
                </FullScreen>
                <FooterWrapper />
              </Content>
              <EmbedWrapper />
              <ShareWrapper />
              <ContactWrapper />
              <InstallButton />
              <CO2EModal />
              <MapModal />
              <AvoidModal />
              <NextModal />
            </ModalProvider>
          </SearchProvider>
        </UXProvider>
      </QueryClientProvider>
    </Wrapper>
  )
}
