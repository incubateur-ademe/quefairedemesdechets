import React, { useState, useContext } from 'react'
import styled, { keyframes } from 'styled-components'

import { useWaste } from 'utils/api'
import UXContext from 'utils/UXContext'

const flightLeft = keyframes`
  from {
    left: 1rem;
    transform: translateY(-50%);
  }
  7% {
    left: 1rem;
    transform: translateY(-90%)  rotate(-20deg);
  }
  8.5% {
    left: 1rem;
    transform: translateY(-90%)  rotate(-20deg);
  }
  12% {
    left: 1rem;
    transform: translateY(-50%) rotate(-20deg);
  }
  14% {
    left: 1rem;
    transform: translateY(-50%) rotate(-20deg);
  }
  90% {
    left: 120vw;
     transform: translateY(-50%) rotate(-25deg);
  }
  90.1% {
    left: -10vw;
    transform: translateY(-50%) rotate(-25deg);
  }
  to {
    left: 1rem;
    transform: translateY(-50%);
  }
`
const flightRight = keyframes`
  from {
    right: 1rem;
    transform: translateY(-50%);
  }
  7% {
    right: 1rem;
    transform: translateY(-90%)  rotate(20deg);
  }
  8.5% {
    right: 1rem;
    transform: translateY(-90%)  rotate(20deg);
  }
  12% {
    right: 1rem;
    transform: translateY(-50%) rotate(20deg);
  }
  14% {
    right: 1rem;
    transform: translateY(-50%) rotate(20deg);
  }
  90% {
    right: 120vw;
     transform: translateY(-50%) rotate(25deg);
  }
  90.1% {
    right: -10vw;
    transform: translateY(-50%) rotate(25deg);
  }
  to {
    right: 1rem;
    transform: translateY(-50%);
  }
`
const wink = keyframes`
  from {
    transform: scaleY(1);
  }
  38% {
    transform: scaleY(1);
  }
  38.8% {
    transform: scaleY(0.2);
  }
  39.2% {
    transform: scaleY(0.2);
  }
  40% {
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
const Position = styled.div`
  position: fixed;
  z-index: 12;
  ${(props) => props.position['y']}: 0;
  ${(props) => props.position['x']}: 1rem;
  transform: rotate(${(props) => (props.position['y'] === 'top' ? 180 : 0)}deg)
    translateX(
      ${(props) =>
        (props.position['y'] === 'bottom' && props.position['x'] === 'right') ||
        (props.position['y'] === 'top' && props.position['x'] === 'left')
          ? -8.3125
          : 0}rem
    );
`
const Wrapper = styled.div`
  position: absolute;
  cursor: pointer;
  transform: translateY(${(props) => (props.visible ? -50 : 0)}%);
  transition: transform 400ms ease-out
    ${(props) => (props.visible ? '1000ms' : '0ms')};
  animation: ${(props) =>
      props.flight
        ? props.position['x'] === 'left'
          ? props.position['y'] === 'bottom'
            ? flightLeft
            : flightRight
          : props.position['y'] === 'bottom'
          ? flightRight
          : flightLeft
        : ''}
    2000ms;

  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`
const Svg = styled.svg`
  path,
  circle {
    fill: ${(props) => props.theme.colors.second};
  }

  &:hover {
    animation: ${(props) => (props.visible ? hover : '')} 500ms infinite;
  }
`
const Eye = styled.circle`
  transform-origin: 50.5px 50.5px;
  animation: ${wink} 12000ms linear infinite;
`
export default function Bin() {
  const { isSuccess } = useWaste()
  const { binFlight } = useContext(UXContext)

  const positions = [
    {
      x: 'left',
      y: 'bottom',
    },
    {
      x: 'right',
      y: 'bottom',
    },
    {
      x: 'right',
      y: 'top',
    },
    {
      x: 'left',
      y: 'top',
    },
  ]
  const [currentPosition, setCurrentPosition] = useState(0)
  const [visible, setVisible] = useState(true)

  return (
    <Position position={positions[currentPosition]}>
      <Wrapper
        visible={visible && isSuccess}
        flight={binFlight}
        position={positions[currentPosition]}
        onClick={() => {
          setVisible(false)
          setTimeout(() => {
            setCurrentPosition((prevCurrentPosition) =>
              prevCurrentPosition < 3 ? prevCurrentPosition + 1 : 0
            )
            setVisible(true)
          }, 500)
          window._paq?.push(['trackEvent', 'Misc', 'Poubelle'])
        }}
      >
        <Svg
          aria-hidden='true'
          visible={visible}
          width='133'
          height='133'
          viewBox='0 0 133 133'
        >
          <path d='M106.062 25.59L97.5825 122.216H35.4175L26.9398 25.59L16.1974 26.5317L24.83 124.91C25.2843 129.445 29.2187 133 33.7893 133H99.211C103.78 133 107.716 129.447 108.178 124.846L116.805 26.5317L106.062 25.59Z' />
          <path d='M86.2702 0H46.7298C41.7745 0 37.7432 4.0313 37.7432 8.98659V26.061H48.5268V10.7837H84.4727V26.0607H95.2563V8.98633C95.2568 4.0313 91.2255 0 86.2702 0Z' />
          <path d='M124.013 20.669H8.98656C6.00835 20.669 3.5946 23.0828 3.5946 26.061C3.5946 29.0392 6.00835 31.4529 8.98656 31.4529H124.014C126.992 31.4529 129.406 29.0392 129.406 26.061C129.406 23.0828 126.992 20.669 124.013 20.669Z' />
          <Eye cx='50.5' cy='50.5' r='7.5' />
          <circle cx='82.5' cy='50.5' r='7.5' />
        </Svg>
      </Wrapper>
    </Position>
  )
}
