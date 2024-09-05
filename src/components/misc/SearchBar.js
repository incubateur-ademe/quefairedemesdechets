import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import Fuse from "fuse.js";

import { useWaste } from "utils/api";
import SearchContext from "utils/SearchContext";
import TextInput from "./searchBar/TextInput";
import Suggestions from "./searchBar/Suggestions";

const Wrapper = styled.form`
  position: absolute;
  z-index: 100;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.background};
  ${(props) => props.theme.shadow};
  border: 0.25em solid ${(props) => props.theme.colors.main};
  border-radius: 2em;
  overflow: hidden;
  opacity: ${(props) => (props.$isFetched && !props.$small ? 1 : 0)};
  pointer-events: ${(props) => (props.small ? "none" : "inherit")};
  transition: opacity 750ms;

  ${(props) => props.theme.mq.small} {
    top: 100%;
    left: 0;
    right: 0;
    border: 0.125em solid ${(props) => props.theme.colors.main};
    border-radius: 1.25em;
    opacity: 1;
    transition: none;
  }
`;

export default function SearchBar(props) {
  const { data, isFetched } = useWaste();
  const { search, setSearch } = useContext(SearchContext);

  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  useEffect(() => {
    if (data) {
      setFuse(
        new Fuse(data, {
          keys: ["searchable"],
          threshold: 0.3,
          ignoreLocation: true,
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (fuse && search.length > 2) {
      setResults(
        fuse.search(search.normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
      );
    } else {
      setResults([]);
    }
  }, [search, fuse]);

  const [focus, setFocus] = useState(false);
  const input = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!focus) {
      setCurrent(0);
      input.current && input.current.blur();
    }
  }, [focus]);

  const navigateToProduct = (product) => {
    navigate(`/dechet/${product.item[`slug`]}${window.location.search}`);
    setSearch(product.item[`Nom`]);
    setFocus(false);
  };

  return (
    <Wrapper
      $isFetched={props.isFetched}
      $small={props.small}
      focus={focus.toString()}
      onSubmit={(e) => {
        e.preventDefault();
        if (results[current]) {
          navigateToProduct(results[current]);
        }
      }}
      className={props.className}
    >
      <TextInput
        small={props.small}
        ref={input}
        search={search}
        focus={focus}
        suggestion={results[current]}
        suggestionVisible={isFetched && focus}
        setSearch={setSearch}
        setFocus={setFocus}
      />
      {isFetched && focus && (
        <Suggestions
          search={search}
          results={results}
          focus={focus}
          current={current}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToProduct}
        />
      )}
    </Wrapper>
  );
}
