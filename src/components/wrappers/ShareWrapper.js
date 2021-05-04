import React from 'react'

import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  return (
    <Share
      small={props.small}
      title='Télétravail - Mon Impact Transport'
      message='Vous êtes en télétravail ou vous souhaitez vous y mettre ? Calculez facilement l’impact sur le climat !'
    />
  )
}
