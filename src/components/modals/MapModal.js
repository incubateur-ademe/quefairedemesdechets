import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'
const MapWrapper = React.lazy(() => import('components/misc/MapWrapper'))

const Wrapper = styled.div`
  position: relative;
  margin: -2rem -1.5rem;
  height: 90vh;
  border-radius: 1rem;
  overflow: hidden;
`
export default function MapModal() {
  const { map, setMap } = useContext(ModalContext)

  const isSSR = typeof window === 'undefined'

  return (
    <Modal open={map} setOpen={setMap}>
      <Wrapper>
        {!isSSR && (
          <React.Suspense fallback={<div />}>
            <MapWrapper product={map} />
          </React.Suspense>
        )}
      </Wrapper>
    </Modal>
  )
}
