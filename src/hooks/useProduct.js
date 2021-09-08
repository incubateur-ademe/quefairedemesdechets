import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useWaste } from 'utils/api'

export default function useProduct() {
  let { name } = useParams()

  const { data } = useWaste()
  const [product, setProduct] = useState()
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (data) {
      const newProduct = data.find((product) => product['slug'] === name)
      setProduct({
        ...newProduct,
        map:
          newProduct && (newProduct['Déchèterie'] || newProduct['Pharmacie']),
      })
      setNotFound(!newProduct && data.length ? true : false)
    }
  }, [name, data, setProduct])
  return { product, notFound }
}
