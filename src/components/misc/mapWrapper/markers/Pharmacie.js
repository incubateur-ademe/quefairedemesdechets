import React from 'react'

import Marker from './Marker'

export default function Pharmacie(props) {
  console.log(props.pharmacie['text_fr'])
  return (
    <Marker
      open={props.open}
      setCurrentMarker={props.setCurrentMarker}
      id={props.pharmacie['id']}
      latitude={Number(props.pharmacie['center'][1])}
      longitude={Number(props.pharmacie['center'][0])}
      title={props.pharmacie['text_fr']}
    >
      {props.pharmacie['place_name_fr']}
    </Marker>
  )
}
