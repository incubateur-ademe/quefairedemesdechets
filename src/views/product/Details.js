import React from 'react'
import styled from 'styled-components'

import Map from './details/Map'

const Wrapper = styled.div`
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
const Section = styled.section`
  margin-bottom: 4rem;
`
const Title = styled.h2`
  margin-bottom: 1.25rem;
`
const Text = styled.p`
  font-size: 1.125rem;
`
export default function Product(props) {
  return (
    <Wrapper>
      {props.product.map && (
        <Section>
          <Title>Où l'apporter ?</Title>

          <Map product={props.product} />
        </Section>
      )}
      {props.product[`Que_va-t-il_devenir_?`] && (
        <Section>
          <Title>Que va-t-il devenir ?</Title>
          <Text
            dangerouslySetInnerHTML={{
              __html: props.product[`Que_va-t-il_devenir_?`],
            }}
          />
        </Section>
      )}
      {props.product[`Comment_les_Ã©viter_?`] && (
        <Section>
          <Title>Comment l'éviter ?</Title>
          <Text
            dangerouslySetInnerHTML={{
              __html: props.product[`Comment_les_Ã©viter_?`],
            }}
          />
        </Section>
      )}
    </Wrapper>
  )
}
