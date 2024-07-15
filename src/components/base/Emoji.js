import React from "react";
import styled from "styled-components";
import twemoji from "twemoji";

const Wrapper = styled.span`
  display: inline-block;
  font-style: normal;
  vertical-align: middle;

  img {
    display: block;
    width: auto;
    height: 1em;
  }
`;
export default function Emoji(props) {
  return props.children ? (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(props.children, {
          folder: "svg",
          ext: ".svg",
        }),
      }}
      className={props.className}
      onClick={props.onClick || (() => "")}
    />
  ) : (
    ""
  );
}
