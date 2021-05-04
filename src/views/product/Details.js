import React from 'react'
import styled from 'styled-components'

const Title = styled.h2``
const Text = styled.p`
  margin-bottom: 2.5rem;
  font-size: 1.125rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
`
export default function Details(props) {
  return (
    <>
      {props.product[`Comment_les_Ã©viter_?`] && (
        <>
          <Title>Comment éviter de le produire ?</Title>
          <Text
            dangerouslySetInnerHTML={{
              __html: props.product[`Comment_les_Ã©viter_?`],
            }}
          />
        </>
      )}
      {props.product[`Que_va-t-il_devenir_?`] && (
        <>
          <Title>Que va t-il devenir ?</Title>
          <Text
            dangerouslySetInnerHTML={{
              __html: props.product[`Que_va-t-il_devenir_?`],
            }}
          />
        </>
      )}
    </>
  )
}
