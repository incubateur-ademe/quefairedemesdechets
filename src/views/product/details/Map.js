import React from 'react'
import styled from 'styled-components'

import MapWrapper from 'components/misc/MapWrapper'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 35rem;
  border-radius: 1rem;
  overflow: hidden;
`
export default function Map(props) {
  return (
    <Wrapper>
      <MapWrapper product={props.product} />
    </Wrapper>
  )
}
