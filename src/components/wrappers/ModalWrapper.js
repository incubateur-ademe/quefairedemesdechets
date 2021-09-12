import React from 'react'

import CO2EModal from 'components/modals/CO2EModal'
import MapModal from 'components/modals/MapModal'
import AvoidModal from 'components/modals/AvoidModal'
import NextModal from 'components/modals/NextModal'

export default function ModalWrapper() {
  return (
    <>
      <CO2EModal />
      <MapModal />
      <AvoidModal />
      <NextModal />
    </>
  )
}
