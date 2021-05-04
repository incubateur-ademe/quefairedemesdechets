import React, { useState, useEffect } from 'react'
import WasteContext from 'utils/WasteContext'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function WasteProvider(props) {
  const { data: wasteData, isFetching } = useQuery('waste', () =>
    axios.get('/data/waste.json').then((res) => res.data)
  )
  const [waste, setWaste] = useState([])
  useEffect(() => {
    if (wasteData) {
      let tempWaste = [...wasteData.results]

      for (let result of wasteData.results) {
        if (result['Synonymes_existants']) {
          const synonyms = result['Synonymes_existants'].split(' / ')
          for (let i = 0; i < synonyms.length; i++) {
            tempWaste.push({
              ...result,
              Nom: synonyms[i],
              parent: result['Nom'],
              ID: result['ID'] + '_' + i,
            })
          }
        }
      }
      tempWaste = tempWaste.map((waste) => ({
        ...waste,
        searchable: waste['Nom']
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, ''),
      }))
      tempWaste = tempWaste.map((waste) => ({
        ...waste,
        slug: waste[`searchable`].replaceAll(' ', '-').toLowerCase(),
      }))
      setWaste(tempWaste)
    }
  }, [wasteData])

  const { data: links } = useQuery(
    ['links', waste],
    () => axios.get('/data/links.json').then((res) => res.data),
    {
      enabled: waste.length ? true : false,
    }
  )
  const [linksSet, setLinksSet] = useState(false)
  useEffect(() => {
    if (links && !linksSet) {
      setLinksSet(true)
      setWaste((prevWaste) =>
        prevWaste.map((product) => ({
          ...product,
          links: links.results.filter((link) =>
            link['Produits_associÃ©s'].includes(product['Nom'])
          ),
        }))
      )
    }
  }, [waste, links, linksSet])

  return (
    <WasteContext.Provider
      value={{
        waste,
        isFetching,
      }}
    >
      {props.children}
    </WasteContext.Provider>
  )
}
