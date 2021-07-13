import React from 'react'

import Marker from './Marker'

export default function Decheterie(props) {
  return (
    <Marker
      open={props.open}
      setCurrentMarker={props.setCurrentMarker}
      id={props.decheterie['_id']}
      latitude={Number(props.decheterie['_geopoint'].split(',')[0])}
      longitude={Number(props.decheterie['_geopoint'].split(',')[1])}
      title={props.decheterie['Nom_Déchèterie'].replaceAll(' ', ' ')}
    >
      {props.decheterie['Adresse_Déchèterie'].replaceAll(' ', ' ')}
      <br />
      {props.decheterie['Code_postal_Déchèterie']}{' '}
      {props.decheterie['Commune_Déchèterie'].replaceAll(' ', ' ')}
    </Marker>
  )
}
