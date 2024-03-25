import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import { useWaste } from 'utils/api'
import Header from 'components/layout/Header'
import GifTitle from 'components/misc/GifTitle'
import SearchBar from 'components/misc/SearchBar'

const StyledHeader = styled(Header)`
  ${(props) => props.theme.mq.small} {
    &:before {
      content: ${(props) => (props.small ? '""' : 'none')};
      position: absolute;
      bottom: 0;
      left: -0.75rem;
      right: -0.75rem;
      height: 0.125rem;
      background-color: ${(props) =>
        props.theme.colors[props.noHeader ? 'background' : 'second']};
    }
  }
`
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SearchBarWrapper = styled.div`
  position: relative;
  width: ${(props) => (props.noHeader ? '100%' : '20rem')};
  height: 2.875rem;
  margin-top: ${(props) => (props.noHeader ? '1rem' : 0)};

  ${(props) => props.theme.mq.small} {
    display: ${(props) => (props.noHeader ? 'block' : 'none')};
  }
`
const StyledSearchBar = styled(SearchBar)`
  top: 0;
  font-size: 0.7rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`
export default function HeaderWrapper(props) {
  const location = useLocation()
  const { isFetched } = useWaste()
  return (
    <StyledHeader small={location.pathname !== '/'} noHeader={props.noHeader}>
      {location.pathname !== '/' && (
        <Wrapper>
          {!props.noHeader && <GifTitle small />}
          <SearchBarWrapper noHeader={props.noHeader}>
            <StyledSearchBar isFetched={isFetched} />
          </SearchBarWrapper>
        </Wrapper>
      )}
    </StyledHeader>
  )
}
