import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -0.125rem -0.125rem -0.125rem -0.125rem;
  border-bottom: 0.125rem solid ${(props) => props.theme.colors.text};
`
const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  font-size: 1.25rem;
  font-family: 'Baloo Chettan 2';
  text-align: center;
  color: ${(props) =>
    props.theme.colors[props.current ? 'background' : 'text']};
  background-color: ${(props) =>
    props.current ? props.theme.colors.text : 'transparent'};
  border: none;
  border-right: 0.125rem solid ${(props) => props.theme.colors.text};
  cursor: pointer;
  transition: all 300ms ease-out;

  &:hover {
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) => props.theme.colors.text};
  }
`
export default function Tabs(props) {
  return (
    <Wrapper>
      <Tab current={props.open === 'map'} onClick={() => props.setOpen('map')}>
        Ou l'apporter ?
      </Tab>
      <Tab
        current={props.open === 'next'}
        onClick={() => props.setOpen('next')}
      >
        Que va t'il devenir ?
      </Tab>
      <Tab
        current={props.open === 'avoid'}
        onClick={() => props.setOpen('avoid')}
      >
        Comment l'éviter ?
      </Tab>
    </Wrapper>
  )
}
