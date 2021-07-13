import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import WasteContext from 'utils/WasteContext'
import Suggestions from 'components/misc/Suggestions'
import Presentation from './product/Presentation'
import Details from './product/Details'
import DetailsMobile from './product/DetailsMobile'
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
  const [notFound, setNotFound] = useState(false)
  useEffect(() => {
    const newProduct = waste.find((product) => product['slug'] === name)
    setProduct({ ...newProduct, map: newProduct && newProduct['Déchèterie'] })
    setNotFound(newProduct ? false : true)
  }, [name, waste])

  return (
    <>
      <Wrapper visible={product}>
        {product && (
          <>
            <Presentation product={product} />
            <Details product={product} />
            <DetailsMobile product={product} />
            <Links product={product} />
          </>
        )}
      </Wrapper>
      {notFound && (
        <Suggestions>
          Ce déchet n'existe pas :(
          <br />
          Essayez une des suggestions ci dessous.
        </Suggestions>
      )}
    </>
  )
}
