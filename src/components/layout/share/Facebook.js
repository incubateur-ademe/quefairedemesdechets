import React from "react";
import styled from "styled-components";
import { FacebookShareButton } from "react-share";

const Svg = styled.svg``;
export default function Facebook(props) {
  return (
    <FacebookShareButton
      url={props.url}
      quote={props.quote}
      onClick={() =>
        window._paq?.push(["trackEvent", "Share", "Facebook", props.url])
      }
    >
      <Svg height="512" viewBox="0 0 512 512" width="512">
        <path d="m512 256c0-141.4-114.6-256-256-256s-256 114.6-256 256 114.6 256 256 256c1.5 0 3 0 4.5-.1v-199.2h-55v-64.1h55v-47.2c0-54.7 33.4-84.5 82.2-84.5 23.4 0 43.5 1.7 49.3 2.5v57.2h-33.6c-26.5 0-31.7 12.6-31.7 31.1v40.8h63.5l-8.3 64.1h-55.2v189.5c107-30.7 185.3-129.2 185.3-246.1z" />
      </Svg>
    </FacebookShareButton>
  );
}
