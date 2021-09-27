import React from 'react'
import styled from 'styled-components'

import MapWrapper from 'components/misc/MapWrapper'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: clamp(20rem, 75vh, 35rem);
  border-radius: 1rem;
  border: 0.125rem solid ${(props) => props.theme.colors.secondLight};
  overflow: hidden;
`
export default function Map(props) {
  return (
    <Wrapper>
      <MapWrapper product={props.product} />
    </Wrapper>
  )
}
