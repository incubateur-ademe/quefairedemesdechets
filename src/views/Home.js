import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { useWaste } from 'utils/api'
import Title from 'components/misc/Title'
import SearchBar from 'components/misc/SearchBar'
import SuggestionsWrapper from './home/SuggestionsWrapper'

const Wrapper = styled.div`
  position: relative;
  height: 0rem;
  padding-top: 3rem;
  margin-bottom: calc(4.1rem + 3rem);
`
export default function Home() {
  const { isFetched } = useWaste()

  axios
    .get(
      `https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-produits-2/lines?format=json&q_mode=simple&size=1000&sampling=neighbors`
    )
    .then((res) => res.data.results)
    .then((wasteRes) =>
      axios
        .get(
          'https://data.ademe.fr/data-fair/api/v1/datasets/que-faire-de-mes-dechets-liens-2/lines?format=json&q_mode=simple&size=1000&sampling=neighbors'
        )
        .then((res) => res.data.results)
        .then((linkRes) => {
          let tempWaste = [...wasteRes]

          for (let result of wasteRes) {
            if (result['Synonymes_existants']) {
              const synonyms = result['Synonymes_existants'].split(' / ')
              for (let i = 0; i < synonyms.length; i++) {
                if (!tempWaste.find((waste) => waste['Nom'] === synonyms[i])) {
                  tempWaste.push({
                    ...result,
                    ID: result['ID'] + '_' + i,
                    Nom: synonyms[i],
                    parent: result['Nom'],
                  })
                }
              }
            }
          }
          return tempWaste.map((waste) => ({
            ...waste,
            slug: waste[`Nom`]
              .toLowerCase()
              .replace(/\s/g, '-')
              .replace(/'/g, '-')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, ''),
            map:
              waste['Bdd'] === 'sinoe' ||
              waste['Bdd'] === 'google' ||
              waste['Bdd'] === 'ocad3e' ||
              waste['Code'] === 'ADEME_DASRI',
            links: linkRes.filter((link) =>
              link['Produits_associes']
                .split('; ')
                .includes(waste['ID'].split('_')[0])
            ),
          }))
        })
    )
    .then((res) => res.sort((a, b) => (a['ID'] > b['id'] ? 1 : -1)))
    .then((res) => console.log(res))

  return (
    <div>
      <Title />
      <Wrapper>
        <SearchBar isFetched={isFetched} />
      </Wrapper>
      <SuggestionsWrapper />
    </div>
  )
}
