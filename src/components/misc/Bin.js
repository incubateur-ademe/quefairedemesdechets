import React, { useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import WasteContext from 'utils/WasteContext'

const wink = keyframes`
  from {
    transform: scaleY(1);
  }
  19% {
    transform: scaleY(1);
  }
  19.4% {
    transform: scaleY(0.2);
  }
  19.6% {
    transform: scaleY(0.2);
  }
  20% {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(1);
  }
`
const hover = keyframes`
  0% {
    transform: translateX(0);
  }

  13% {
    transform: translateX(-6px) rotateY(-12deg);
  }

  37% {
    transform: translateX(5px) rotateY(14deg);
  }

  63% {
    transform: translateX(-5px) rotateY(-10deg);
  }

  87% {
    transform: translateX(6px) rotateY(12deg);
  }

 100% {
    transform: translateX(0);
  }
`
const Wrapper = styled.div`
  position: fixed;
  z-index: 12;
  bottom: 0;
  ${(props) => props.position}: 1rem;
  cursor: pointer;
  transform: translateY(${(props) => (props.visible ? '50%' : '100%')});
  transition: transform 400ms ease-out
    ${(props) => (props.visible ? '2500ms' : '0ms')};

  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`
const Svg = styled.svg`
  path,
  circle {
    fill: ${(props) => props.theme.colors.text};
  }

  &:hover {
    animation: ${(props) => (props.visible ? hover : '')} 500ms infinite;
  }
`
const Eye = styled.circle`
  transform-origin: 50.5px 50.5px;
  animation: ${wink} 25000ms linear infinite;
`
export default function Bin() {
  const { waste } = useContext(WasteContext)

  const [position, setPosition] = useState('left')
  const [visible, setVisible] = useState(true)

  return (
    <Wrapper
      visible={visible && waste.length}
      position={position}
      onClick={() => {
        setVisible(false)
        setTimeout(() => {
          setPosition((prevPosition) =>
            prevPosition === 'left' ? 'right' : 'left'
          )
          setVisible(true)
        }, 500)
      }}
    >
      <Svg visible={visible} width='133' height='133' viewBox='0 0 133 133'>
        <path d='M106.062 25.59L97.5825 122.216H35.4175L26.9398 25.59L16.1974 26.5317L24.83 124.91C25.2843 129.445 29.2187 133 33.7893 133H99.211C103.78 133 107.716 129.447 108.178 124.846L116.805 26.5317L106.062 25.59Z' />
        <path d='M86.2702 0H46.7298C41.7745 0 37.7432 4.0313 37.7432 8.98659V26.061H48.5268V10.7837H84.4727V26.0607H95.2563V8.98633C95.2568 4.0313 91.2255 0 86.2702 0Z' />
        <path d='M124.013 20.669H8.98656C6.00835 20.669 3.5946 23.0828 3.5946 26.061C3.5946 29.0392 6.00835 31.4529 8.98656 31.4529H124.014C126.992 31.4529 129.406 29.0392 129.406 26.061C129.406 23.0828 126.992 20.669 124.013 20.669Z' />
        <Eye cx='50.5' cy='50.5' r='7.5' />
        <circle cx='82.5' cy='50.5' r='7.5' />
      </Svg>
    </Wrapper>
  )
}
