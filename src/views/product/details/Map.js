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
const IFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`

const IFrameWrapper = (props) => {
  return (
    <IFrame
      id="lvao_iframe"
      allow="geolocation"
      allowFullScreen={true}
      webkitallowfullscreen="true"
      mozallowfullscreen="true" 
      src={props.src}
      />
  )
}

export default function Map(props) {
  return (
    <Wrapper product={props.product}>
      {
        props.product.Nom === "Vêtement (propre et sec)"
        ? <IFrameWrapper src="https://lvao.ademe.fr/?carte&sous_categorie_objet=V%C3%AAtement&sc_id=107&limit=25" />
        : <MapWrapper product={props.product} />
      }
    </Wrapper>
  )
}
