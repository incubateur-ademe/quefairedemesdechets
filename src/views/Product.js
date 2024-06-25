import React from 'react'

import Presentation from './product/Presentation'
import Details from './product/Details'
import Links from './product/Links'

export default function Product(props) {
  return (
    <main>
      <Presentation product={props.product} />
      <Details product={props.product} />
      <Links product={props.product} />
    </main>
  )
}
