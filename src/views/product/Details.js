import React, { useState, useEffect } from 'react'
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

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`

export default function Product(props) {
  const [open, setOpen] = useState(null)
  useEffect(() => {
    if (!open && props.product['slug']) {
      setOpen(props.product.map ? 'map' : 'next')
    }
  }, [props.product, open])
  return (
    <Wrapper>
      <Tabs setOpen={setOpen} open={open} product={props.product} />
      <Map open={open === 'map'} product={props.product} />
      <Next open={open === 'next'} product={props.product} />
      <Avoid open={open === 'avoid'} product={props.product} />
    </Wrapper>
  )
}
