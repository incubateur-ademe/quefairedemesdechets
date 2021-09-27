import React from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'

import { useWaste } from 'utils/api'
import Header from 'components/layout/Header'
import Title from 'components/misc/Title'
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
      background-color: ${(props) => props.theme.colors.second};
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
  width: 20rem;
  height: 2.875rem;

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
const StyledSearchBar = styled(SearchBar)`
  top: 0;
  font-size: 0.7rem;
`
export default function HeaderWrapper() {
  const location = useLocation()
  const { isFetched } = useWaste()
  return (
    <StyledHeader small={location.pathname !== '/'}>
      {location.pathname !== '/' && (
        <Wrapper>
          <Title small />
          <SearchBarWrapper>
            <StyledSearchBar isFetched={isFetched} />
          </SearchBarWrapper>
        </Wrapper>
      )}
    </StyledHeader>
  )
}
