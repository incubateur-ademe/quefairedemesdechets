import React, { useState, useEffect, useContext, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Fuse from '../../../../node_modules/fuse.js/dist/fuse.basic.esm.min.js'

import WasteContext from 'utils/WasteContext'
import SearchContext from 'utils/SearchContext'
import TextInput from './searchBar/TextInput'
import Suggestions from './searchBar/Suggestions'

const Wrapper = styled.form`
  position: absolute;
  z-index: 100;
  top: 100%;
  left: 0.5rem;
  right: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  ${(props) => props.theme.shadow};
  border: 0.25rem solid ${(props) => props.theme.colors.main};
  border-radius: 2rem;
  overflow: hidden;
  opacity: ${(props) => (props.isFetching ? 0 : 1)};
  transition: opacity 1500ms;

  ${(props) => props.theme.mq.small} {
    left: 0;
    right: 0;
    border: 0.125rem solid ${(props) => props.theme.colors.main};
    border-radius: 1.65625rem;
  }
`

export default function SearchBar(props) {
  let history = useHistory()

  const { waste } = useContext(WasteContext)
  const { search, setSearch } = useContext(SearchContext)

  const [results, setResults] = useState([])
  const [fuse, setFuse] = useState(null)
  useEffect(() => {
    if (waste) {
      setFuse(
        new Fuse(waste, {
          keys: ['searchable'],
          threshold: 0.2,
          ignoreLocation: true,
          minMatchCharLength: 3,
        })
      )
    }
  }, [waste])

  useEffect(() => {
    if (fuse) {
      setResults(
        fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      )
    }
  }, [search, fuse])

  const [focus, setFocus] = useState(false)
  const input = useRef(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!focus) {
      setCurrent(0)
      input.current && input.current.blur()
    }
  }, [focus])

  const navigateToProduct = (product) => {
    console.log(product)
    history.push(`/dechet/${product.item[`slug`]}`)
    setSearch(product.item[`Nom`])
    setFocus(false)
  }

  return (
    <Wrapper
      isFetching={props.isFetching}
      focus={focus}
      onSubmit={(e) => {
        e.preventDefault()
        if (current > -1) {
          navigateToProduct(results[current])
        }
      }}
    >
      <TextInput
        small={props.small}
        ref={input}
        search={search}
        focus={focus}
        suggestion={results[current]}
        suggestionVisible={waste && focus}
        setSearch={setSearch}
        setFocus={setFocus}
      />
      {waste && focus && (
        <Suggestions
          search={search}
          results={results}
          focus={focus}
          current={current}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToProduct}
        />
      )}
    </Wrapper>
  )
}
