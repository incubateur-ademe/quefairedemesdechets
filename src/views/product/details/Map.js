import React from 'react'
import styled from 'styled-components'

const MapWrapper = React.lazy(() => import('components/misc/MapWrapper'))

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;
  padding-top: 0.125rem;
  border-top: 0.125rem solid ${(props) => props.theme.colors.text};
`
export default function Map(props) {
  const isSSR = typeof window === 'undefined'

  return props.open ? (
    <Wrapper>
      {!isSSR && (
        <React.Suspense fallback={<div />}>
          <MapWrapper product={props.product} />
        </React.Suspense>
      )}
    </Wrapper>
  ) : null
}
