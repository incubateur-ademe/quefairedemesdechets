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
  top: ${(props) => (props.small ? '1rem' : '100%')};
  left: ${(props) => (props.small ? 20 : 0.5)}rem;
  right: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  ${(props) => props.theme.shadow};
  border: 0.25em solid ${(props) => props.theme.colors.main};
  border-radius: 2em;
  overflow: hidden;
  opacity: ${(props) => (props.isFetched ? 1 : 0)};
  transition: opacity 1500ms;

  ${(props) => props.theme.mq.small} {
    top: 100%;
    left: 0;
    right: 0;
    border: 0.125em solid ${(props) => props.theme.colors.main};
    border-radius: 1.65625em;
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
          threshold: 0.3,
          ignoreLocation: true,
        })
      )
    }
  }, [waste])

  useEffect(() => {
    if (fuse && search.length > 2) {
      setResults(
        fuse.search(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      )
    } else {
      setResults([])
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
      isFetched={props.isFetched}
      small={props.small}
      focus={focus}
      onSubmit={(e) => {
        e.preventDefault()
        if (results[current]) {
          navigateToProduct(results[current])
        }
      }}
      className={props.className}
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
