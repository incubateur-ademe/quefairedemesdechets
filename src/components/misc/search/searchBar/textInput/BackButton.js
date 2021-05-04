import React, { useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import SearchContext from 'utils/SearchContext'

const Wrapper = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding-left: 1.5rem;
  background: ${(props) => props.theme.colors.background};
  border: none;

  ${(props) => props.theme.mq.small} {
    padding-left: 1rem;
  }

  path {
    fill: ${(props) => props.theme.colors.text};
    transition: fill 300ms ease-out;
  }

  &:focus {
    outline: none;

    path {
      fill: ${(props) => props.theme.colors.ter};
    }
  }
`
const Glass = styled.svg`
  position: relative;
  transform: translateY(0);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 300ms;

  ${(props) => props.theme.mq.small} {
    width: 1.5rem;
    height: auto;
  }
`
const Arrow = styled.svg`
  position: absolute;
  top: 50%;
  right: 0.3rem;
  width: 2rem;
  height: auto;
  transform: translateY(-50%);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 400ms;

  ${(props) => props.theme.mq.small} {
    width: 1.5rem;
  }
`
export default function BackButton(props) {
  let history = useHistory()
  const { setSearch } = useContext(SearchContext)
  return (
    <Wrapper
      type='button'
      disabled={!props.small || props.focus}
      onClick={() => {
        setSearch('')
        history.push(`/`)
      }}
    >
      <Glass
        visible={!props.small || props.focus}
        width='30'
        height='30'
        viewBox='0 0 30 30'
      >
        <path d='M29.0414 27.3252L21.9013 19.8992C23.7372 17.7169 24.743 14.971 24.743 12.1125C24.743 5.43377 19.3093 0 12.6306 0C5.95183 0 0.518066 5.43377 0.518066 12.1125C0.518066 18.7912 5.95183 24.225 12.6306 24.225C15.1378 24.225 17.5272 23.4687 19.57 22.0331L26.7642 29.5155C27.065 29.8278 27.4694 30 27.9028 30C28.3131 30 28.7022 29.8436 28.9977 29.5592C29.6254 28.9552 29.6454 27.9535 29.0414 27.3252ZM12.6306 3.15978C17.5672 3.15978 21.5833 7.17586 21.5833 12.1125C21.5833 17.0491 17.5672 21.0652 12.6306 21.0652C7.69393 21.0652 3.67785 17.0491 3.67785 12.1125C3.67785 7.17586 7.69393 3.15978 12.6306 3.15978Z' />
      </Glass>
      <Arrow
        visible={props.small && !props.focus}
        width='42'
        height='42'
        viewBox='0 0 42 42'
      >
        <path d='M39.4755 18.052C39.3037 18.0241 39.1298 18.0112 38.9557 18.0135H9.32559L9.97168 17.713C10.6032 17.4141 11.1778 17.0072 11.6696 16.5109L19.9786 8.2019C21.0729 7.15726 21.2568 5.47676 20.4143 4.22017C19.4338 2.88113 17.5535 2.59038 16.2144 3.57088C16.1062 3.65014 16.0033 3.73654 15.9067 3.82951L0.881326 18.8549C-0.292908 20.0278 -0.293941 21.9305 0.878978 23.1047C0.87973 23.1055 0.880575 23.1063 0.881326 23.1071L15.9067 38.1325C17.0819 39.3044 18.9846 39.3017 20.1566 38.1266C20.2488 38.0341 20.3349 37.9356 20.4143 37.832C21.2568 36.5754 21.0729 34.8949 19.9786 33.8502L11.6846 25.5262C11.2437 25.0848 10.7368 24.7147 10.182 24.4293L9.28052 24.0236H38.7904C40.3255 24.0806 41.6723 23.0083 41.9607 21.4994C42.2264 19.8611 41.1138 18.3177 39.4755 18.052Z' />
      </Arrow>
    </Wrapper>
  )
}
