import React from 'react'
import styled from 'styled-components'

import BackButton from './textInput/BackButton'
import Submit from './textInput/Submit'

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 4.5rem;
  font-size: 1.625rem;
  font-weight: 500;
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
    padding: 0.75rem 3.5rem;
    font-size: 1.25rem;
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

  ${(props) => props.theme.mq.small} {
    opacity: ${(props) => (props.visible ? 0.6 : 0)};
  }
`
const Invisible = styled.div`
  opacity: 0;
  padding: 0.75rem 0.75rem 0.75rem 4.5rem;
  font-size: 1.75rem;
  line-height: 1.15;

  ${(props) => props.theme.mq.small} {
    padding: 0.75rem 0.75rem 0.75rem 3.5rem;
    font-size: 1.25rem;
  }
`
const Visible = styled.div`
  position: relative;
  margin-top: 0.2rem;
  padding-left: 1.25rem;

  ${(props) => props.theme.mq.small} {
    padding-left: 1rem;
    font-size: 0.875rem;
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-150%);
    width: 0.75rem;
    height: 1px;
    background-color: ${(props) => props.theme.colors.text};

    ${(props) => props.theme.mq.small} {
      width: 0.5rem;
    }
  }
`

export default React.forwardRef(function TextInput(props, ref) {
  return (
    <Wrapper>
      <BackButton small={props.small} focus={props.focus} />
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
        {props.suggestion && <Visible>{props.suggestion.item['Nom']}</Visible>}
      </Suggestion>

      <Submit
        visible={props.suggestion && props.suggestionVisible && props.search}
        setFocus={props.setFocus}
      />
    </Wrapper>
  )
})
