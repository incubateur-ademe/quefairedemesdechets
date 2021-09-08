import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  svg {
    display: block;
    height: 2.5rem;
    width: auto;
  }
  path {
    fill: ${(props) => props.theme.colors.main};
  }
`
export default function PreviousButton() {
  return (
    <Wrapper to='/'>
      <svg width='14' height='24' viewBox='0 0 14 24'>
        <path d='M-1.00613e-05 11.9999C-1.00425e-05 11.5698 0.164223 11.1397 0.491997 10.8118L10.8116 0.492339C11.468 -0.164113 12.5323 -0.164113 13.1885 0.492339C13.8447 1.14853 13.8447 2.21264 13.1885 2.86914L4.0572 11.9999L13.1882 21.1308C13.8444 21.7872 13.8444 22.8512 13.1882 23.5074C12.532 24.1641 11.4677 24.1641 10.8112 23.5074L0.491678 13.1881C0.16385 12.86 -1.00801e-05 12.4299 -1.00613e-05 11.9999Z' />
      </svg>
    </Wrapper>
  )
}
