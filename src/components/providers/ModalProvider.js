import React, { useState } from 'react'
import ModalContext from 'utils/ModalContext'

export default function ModalProvider(props) {
  const [CO2E, setCO2E] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        CO2E,
        setCO2E,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}
