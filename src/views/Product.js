import React from 'react'

import Presentation from './product/Presentation'
import Details from './product/Details'
import DetailsMobile from './product/DetailsMobile'
import Links from './product/Links'

export default function Product(props) {
  return (
    <>
      <Presentation product={props.product} />
      <Details product={props.product} />
      <DetailsMobile product={props.product} />
      <Links product={props.product} />
    </>
  )
}
