import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  overflow: hidden;

  ${(props) => props.theme.mq.small} {
    display: flex;
  }
`
const StyledButton = styled(Button)`
  min-width: 80%;
  margin-bottom: 1.5rem;
`

export default function Product(props) {
  const { setMap, setNext, setAvoid } = useContext(ModalContext)

  return (
    <Wrapper>
      <StyledButton expanded onClick={() => setMap(props.product)}>
        Ou l'apporter ?
      </StyledButton>
      {props.product[`Que_va-t-il_devenir_?`] && (
        <StyledButton hollow onClick={() => setNext(props.product)}>
          Que va t'il devenir ?
        </StyledButton>
      )}
      {props.product[`Comment_les_Ã©viter_?`] && (
        <StyledButton hollow onClick={() => setAvoid(props.product)}>
          Comment l'éviter ?
        </StyledButton>
      )}
    </Wrapper>
  )
}
