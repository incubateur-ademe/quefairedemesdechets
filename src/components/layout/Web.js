import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import useWindowSize from 'hooks/useWindowSize'

import ThemeToggle from 'components/base/ThemeToggle'
import InstallButton from 'components/base/InstallButton'
import HeaderWrapper from 'components/wrappers/HeaderWrapper'
import FooterWrapper from 'components/wrappers/FooterWrapper'
import ShareWrapper from 'components/wrappers/ShareWrapper'
import EmbedWrapper from 'components/wrappers/EmbedWrapper'
import ContactWrapper from 'components/wrappers/ContactWrapper'
import Search from 'components/misc/Search'
import Bin from 'components/misc/Bin'

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
  min-height: ${(props) => props.windowHeight}px;
  margin: 0 auto;
  padding: 0 0.75rem 5rem;
`
export default function Web(props) {
  const { height } = useWindowSize()
  let { name } = useParams()
  console.log(name)
  return (
    <Wrapper>
      <ThemeToggle />
      <Content>
        <FullScreen windowHeight={height}>
          <HeaderWrapper />
          <Search />
          {props.children}
          <Bin />
        </FullScreen>
        <FooterWrapper />
      </Content>
      <EmbedWrapper />
      <ShareWrapper />
      <ContactWrapper />
      <InstallButton />
    </Wrapper>
  )
}
