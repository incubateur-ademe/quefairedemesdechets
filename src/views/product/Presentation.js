import React from 'react'
import styled from 'styled-components'

import PreviousButton from './presentation/PreviousButton'
import ShareButton from './presentation/ShareButton'

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  ${(props) => props.theme.mq.small} {
    align-items: flex-start;
    // padding-top: 1.5rem;
  }
`
const Title = styled.h1`
  flex: 1;
  margin: 0 1.5rem 0;
  font-size: 2.75rem;
  line-height: 1.1;

  &:first-letter {
    text-transform: uppercase;
  }

  ${(props) => props.theme.mq.small} {
    font-size: 2rem;
    margin: 0 1rem 0 0;
  }
`
const Subtitle = styled.h3`
  margin: -1rem 3rem 2rem;
  display: block;
`
const Text = styled.div`
  margin-bottom: 3rem;
  font-size: 1.25rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2.5rem;
    font-size: 1rem;
  }

  ul,
  li {
    margin-bottom: 1.5rem;
  }
`
export default function Presentation(props) {
  return (
    <>
      <Header>
        <PreviousButton />
        <Title>{props.product['Nom']}</Title>
        <ShareButton />
      </Header>
      <Text
        dangerouslySetInnerHTML={{
          __html: props.product[`Qu'est-ce_que_j'en_fais_?`],
        }}
      />
    </>
  )
}
