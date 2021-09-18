import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.75rem;
  cursor: pointer;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.5rem;
    height: auto;

    path,
    rect {
      fill: ${(props) => props.theme.colors.main};
    }
  }

  ${(props) => props.theme.mq.small} {
    top: auto;
    bottom: 1rem;
  }
`
export default function Switch(props) {
  return (
    <Wrapper
      onClick={() => props.setList((prevList) => !prevList)}
      aria-label='Changer de mode'
    >
      {props.list ? (
        <svg x='0px' y='0px' viewBox='0 0 477.874 477.874'>
          <path
            d='M460.812,0c-2.651-0.001-5.266,0.615-7.637,1.8L323.844,66.483L177.6,1.476c-0.239-0.102-0.512-0.12-0.768-0.222
			c-0.658-0.246-1.331-0.451-2.014-0.614c-0.679-0.183-1.369-0.326-2.065-0.427c-1.386-0.114-2.779-0.114-4.164,0
			c-0.696,0.101-1.386,0.244-2.065,0.427c-0.683,0.163-1.356,0.368-2.014,0.614c-0.256,0.102-0.529,0.119-0.768,0.222l-153.6,68.267
			C3.976,72.481,0.003,78.595,0.004,85.341v375.467c0.003,5.774,2.924,11.155,7.765,14.302c4.842,3.152,10.949,3.64,16.23,1.297
			l146.671-65.195l146.671,65.195c0.256,0.102,0.529,0,0.785,0.154c4.132,1.848,8.875,1.742,12.919-0.29
			c0.273-0.119,0.58,0,0.853-0.188l136.533-68.267c5.786-2.891,9.441-8.806,9.438-15.275V17.075
			C477.875,7.649,470.237,0.004,460.812,0z M153.604,381.448L34.137,434.542V96.435L153.604,43.34V381.448z M307.204,434.542
			l-119.467-53.094V43.34l119.467,53.094V434.542z M443.737,381.994l-102.4,51.2V95.888l102.4-51.2V381.994z'
          />
        </svg>
      ) : (
        <svg x='0px' y='0px' viewBox='0 0 394.667 394.667'>
          <path d='M32,37.333c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S49.707,37.333,32,37.333z' />
          <path d='M32,165.333c-17.707,0-32,14.293-32,32s14.293,32,32,32s32-14.293,32-32S49.707,165.333,32,165.333z' />
          <path d='M32,293.333c-17.813,0-32,14.4-32,32c0,17.6,14.4,32,32,32c17.6,0,32-14.4,32-32C64,307.733,49.813,293.333,32,293.333z' />
          <rect x='96' y='304' width='298.667' height='42.667' />
          <rect x='96' y='48' width='298.667' height='42.667' />
          <rect x='96' y='176' width='298.667' height='42.667' />
        </svg>
      )}
    </Wrapper>
  )
}
