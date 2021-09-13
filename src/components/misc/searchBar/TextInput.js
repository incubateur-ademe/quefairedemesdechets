import React from 'react'
import styled from 'styled-components'

import Glass from './textInput/Glass'
import Submit from './textInput/Submit'

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`
const Input = styled.input`
  width: 100%;
  padding: 0.5em 2.8em;
  font-size: 1.625em;
  font-weight: normal;
  line-height: 1.25;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }

  ${(props) => props.theme.mq.small} {
    font-size: 1.1em;
  }
`
const Suggestion = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  opacity: ${(props) => (props.visible ? 0.75 : 0)};
  pointer-events: none;
  transition: opacity ${(props) => (props.visible ? 200 : 0)}ms;
`
const Invisible = styled.div`
  opacity: 0;
  padding: 0.45em 0.45em 0.45em 2.8em;
  font-size: 1.625em;
  line-height: 1.15;

  ${(props) => props.theme.mq.small} {
    font-size: 1.1em;
  }
`
const Visible = styled.div`
  position: relative;
  margin-top: 0em;
  padding-left: 1.25em;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-150%);
    width: 0.75em;
    height: 0.05em;
    background-color: ${(props) => props.theme.colors.text};
  }
`
const Name = styled.span`
  ${(props) => props.theme.mq.small} {
    font-size: 0.8em;
  }
`

export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper>
      <Glass />
      <Input
        ref={ref}
        type='text'
        placeholder='Entrez votre recherche'
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
      />
      <Suggestion
        visible={props.suggestion && props.suggestionVisible && props.search}
      >
        <Invisible>{props.search}</Invisible>
        {props.suggestion && (
          <Visible>
            <Name>{props.suggestion.item['Nom']}</Name>
          </Visible>
        )}
      </Suggestion>

      <Submit
        visible={props.suggestion && props.suggestionVisible && props.search}
        setFocus={props.setFocus}
      />
    </Wrapper>
  )
})
