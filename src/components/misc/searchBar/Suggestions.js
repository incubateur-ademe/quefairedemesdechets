import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'

import Highlighter from 'react-highlight-words'

const Wrapper = styled.div`
  max-height: 60vh;
  overflow: hidden;
`
const Suggestion = styled.div`
  padding: 0.75em 0.75em 0.75em 2em;
  cursor: pointer;
  transition: background-color 200ms ease-out;
  background-color: rgba(0, 0, 0, ${(props) => (props.current ? 0.15 : 0)});
  font-size: clamp(13px, 1em, 2em);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  &:last-child {
    padding-bottom: 1.5em;
  }

  mark {
    color: ${(props) => props.theme.colors.text};
    background-color: transparent;
    opacity: 0.5;
  }
`
const Name = styled.span``
export default function Suggestions(props) {
  const onKeyDown = useCallback(
    (e) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        props.current < 9
          ? props.setCurrent((prevCurrent) => prevCurrent + 1)
          : props.setCurrent(0)
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        props.current > 0 && props.setCurrent((prevCurrent) => prevCurrent - 1)
      }
    },
    [props]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <Wrapper>
      {props.results.map(
        (product, index) =>
          index < 10 && (
            <Suggestion
              current={index === props.current}
              key={product.item['Nom']}
              onClick={() => props.handleSuggestionClick(product)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <Name>
                <Highlighter
                  searchWords={props.search.split(' ')}
                  autoEscape={true}
                  textToHighlight={product.item['searchable']}
                />
              </Name>
            </Suggestion>
          )
      )}
    </Wrapper>
  )
}
