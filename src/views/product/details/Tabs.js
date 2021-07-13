import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  //margin: -0.125rem -0.125rem -0.125rem -0.125rem;
  // border-bottom: 0.125rem solid ${(props) => props.theme.colors.text};
`
const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  font-size: 1.125rem;
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

  &:last-child {
    border-right: none;
  }
  &:hover {
    color: ${(props) => props.theme.colors.background};
    background-color: ${(props) => props.theme.colors.text};
  }
`
export default function Tabs(props) {
  return (
    <Wrapper>
      {props.product.map && (
        <Tab
          current={props.open === 'map'}
          onClick={() => props.setOpen('map')}
        >
          Où l'apporter ?
        </Tab>
      )}
      {props.product[`Que_va-t-il_devenir_?`] && (
        <Tab
          current={props.open === 'next'}
          onClick={() => props.setOpen('next')}
        >
          Que va-t-il devenir ?
        </Tab>
      )}
      {props.product[`Comment_les_Ã©viter_?`] && (
        <Tab
          current={props.open === 'avoid'}
          onClick={() => props.setOpen('avoid')}
        >
          Comment l'éviter ?
        </Tab>
      )}
    </Wrapper>
  )
}
