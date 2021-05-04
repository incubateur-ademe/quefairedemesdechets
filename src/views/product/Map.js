import React, { useState } from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;

  ${(props) => props.theme.mq.small} {
    margin-bottom: 2.5rem;
  }
`
const Text = styled.div`
  text-align: center;
`

export default function Map() {
  const [open, setOpen] = useState(false)
  return (
    <Wrapper>
      <Button onClick={() => setOpen((prevOpen) => !prevOpen)}>
        Trouver un point d'apport
      </Button>
      {open && <Text>Not yet</Text>}
    </Wrapper>
  )
}
