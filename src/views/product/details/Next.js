import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  padding: 1.5rem 1.5rem 2.5rem;
  font-size: 1.125rem;
  border-top: 0.125rem solid ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
`
export default function Next(props) {
  return props.product[`Que_va-t-il_devenir_?`] && props.open ? (
    <>
      <Text
        dangerouslySetInnerHTML={{
          __html: props.product[`Que_va-t-il_devenir_?`],
        }}
      />
    </>
  ) : null
}
