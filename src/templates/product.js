import React from 'react'

import Web from 'components/layout/Web'
import Product from 'views/Product'

export default function product(props) {
  return (
    <Web title={props.pageContext.product.Nom}>
      <Product product={props.pageContext.product} />
    </Web>
  )
}
