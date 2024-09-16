import React from "react";
import styled from "styled-components";

import Submit from "./textInput/Submit";
import Geoloc from "./textInput/Geoloc";

const Wrapper = styled.div`
  position: relative;
  // overflow: hidden;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.5rem 4.5rem 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.55;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.4;
  }
  &:focus {
    outline: none;
  }
`;
export default React.forwardRef(function TextInput(
  {
    setFocus,
    setSearch,
    search,
    suggestion,
    suggestionVisible,
    navigateToPlace,
  },
  ref,
) {
  return (
    <Wrapper>
      <Input
        ref={ref}
        type="text"
        placeholder="Entrez votre adresse"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <Submit
        visible={suggestion && suggestionVisible && search}
        setFocus={setFocus}
      />
      <Geoloc
        visible={!(suggestion && suggestionVisible && search)}
        navigateToPlace={navigateToPlace}
      />
    </Wrapper>
  );
});
