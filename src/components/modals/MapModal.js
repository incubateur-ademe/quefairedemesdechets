import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'
import MapWrapper from 'components/misc/MapWrapper'

const Wrapper = styled.div`
  margin: -2rem;
  height: 90vh;
  border-radius: 1rem;
  overflow: hidden;
`
export default function MapModal() {
  const { map, setMap } = useContext(ModalContext)

  return (
    <Modal open={map} setOpen={setMap}>
      <Wrapper>
        <MapWrapper />
      </Wrapper>
    </Modal>
  )
}
