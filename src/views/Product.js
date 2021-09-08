import React from 'react'
import styled from 'styled-components'

import useProduct from 'hooks/useProduct'
import Suggestions from 'components/misc/Suggestions'
import Presentation from './product/Presentation'
import Details from './product/Details'
import DetailsMobile from './product/DetailsMobile'
import Links from './product/Links'

const Wrapper = styled.div`
  margin: 0 auto;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 800ms;
`

export default function Product() {
  const { product, notFound } = useProduct()

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
