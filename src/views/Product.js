import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import WasteContext from 'utils/WasteContext'
import Presentation from './product/Presentation'
import Map from './product/Map'
import Details from './product/Details'
import Links from './product/Links'

const Wrapper = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 800ms;
`

export default function Product() {
  let { name } = useParams()
  let { waste } = useContext(WasteContext)
  const [product, setProduct] = useState(null)
  useEffect(() => {
    setProduct(waste.find((product) => product['slug'] === name))
  }, [name, waste])

  return (
    <Wrapper visible={product}>
      {product && (
        <>
          <Presentation product={product} />
          <Map product={product} />
          <Details product={product} />
          <Links product={product} />
        </>
      )}
    </Wrapper>
  )
}
