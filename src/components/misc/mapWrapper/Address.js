import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { useSearch } from 'utils/api'
import useDebounce from 'hooks/useDebounce'
import TextInput from './address/TextInput'
import Suggestions from './address/Suggestions'

const Wrapper = styled.form`
  position: absolute;
  z-index: 100;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 25rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.text};
  border-radius: 1.375rem;
  transition: box-shadow 200ms ease-out;
  transition: border 200ms ease-out;
  //overflow: hidden;
`

export default function Address(props) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, isFetching } = useSearch(debouncedSearch)

  const [focus, setFocus] = useState(false)
  const input = useRef(null)
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (!focus) {
      setCurrent(0)
      input.current && input.current.blur()
    }
  }, [focus])

  const navigateToPlace = (place) => {
    props.setViewport({
      latitude: place.geometry.coordinates[1],
      longitude: place.geometry.coordinates[0],
      zoom: 12.5,
    })
    setFocus(false)
  }

  return (
    <Wrapper
      focus={focus}
      onSubmit={(e) => {
        e.preventDefault()
        if (current > -1) {
          navigateToPlace(data[current])
        }
      }}
    >
      <TextInput
        ref={input}
        search={search}
        suggestion={data && data[current]}
        suggestionVisible={data && focus}
        isFetching={isFetching}
        setSearch={setSearch}
        setFocus={setFocus}
        setViewport={props.setViewport}
      />
      {data && focus && (
        <Suggestions
          search={debouncedSearch}
          results={data}
          focus={focus}
          current={current}
          isFetching={isFetching}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToPlace}
        />
      )}
    </Wrapper>
  )
}
