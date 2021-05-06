import React, { useState } from 'react'
import styled from 'styled-components'

import Tabs from './details/Tabs'
import Map from './details/Map'
import Avoid from './details/Avoid'
import Next from './details/Next'

const Wrapper = styled.div`
  margin-bottom: 5rem;
  border: 0.125rem solid ${(props) => props.theme.colors.text};
  border-radius: 2rem;
  overflow: hidden;
`

export default function Product(props) {
  const [open, setOpen] = useState(null)
  return (
    <Wrapper visible={props.product}>
      <Tabs setOpen={setOpen} open={open} />
      <Map open={open === 'map'} product={props.product} />
      <Avoid open={open === 'avoid'} product={props.product} />
      <Next open={open === 'next'} product={props.product} />
    </Wrapper>
  )
}
