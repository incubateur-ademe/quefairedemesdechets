import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const Svg = styled.svg`
  display: inline-block;
  width: 0.75em;
  height: auto;
  margin-left: 0.3em;

  path {
    fill: ${(props) => props.theme.colors.main};
  }
`;
export default function MagicLink(props) {
  const { search } = useLocation();
  return !props.to ? (
    <button
      id={props.id}
      className={props.className}
      title={props.title}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </button>
  ) : props.to.includes(":") ||
    props.to.includes(".") ||
    props.to.includes("#") ? (
    <a
      id={props.id}
      className={props.className}
      title={props.title}
      href={props.to}
      onClick={props.onClick || null}
      target={
        props.to.includes(":") || props.to.includes(".") ? "_blank" : "_self"
      }
      rel="noreferrer noopener"
      aria-label={props["aria-label"]}
    >
      {props.children}
      {!props.noIcon && (
        <Svg x="0px" y="0px" viewBox="0 0 283.178 283.178">
          <path
            d="M254.812,140.713h-20c-4.142,0-7.5,3.358-7.5,7.5v91.186c0,4.84-3.939,8.778-8.779,8.778H43.776
		c-4.839,0-8.775-3.938-8.775-8.778V64.645c0-4.841,3.936-8.78,8.775-8.78h95.855c4.142,0,7.5-3.358,7.5-7.5v-20
		c0-4.142-3.358-7.5-7.5-7.5H43.776c-24.138,0-43.775,19.64-43.775,43.78v174.755c0,24.14,19.638,43.778,43.775,43.778h174.756
		c24.14,0,43.779-19.639,43.779-43.778v-91.186C262.312,144.071,258.954,140.713,254.812,140.713z"
          />
          <path
            d="M275.677,0h-79.553c-4.142,0-7.5,3.358-7.5,7.5v20c0,4.142,3.358,7.5,7.5,7.5h27.304
		L120.683,137.743c-2.929,2.929-2.929,7.677,0,10.607l14.142,14.143c1.407,1.407,3.314,2.197,5.304,2.197
		c1.989,0,3.897-0.79,5.303-2.197L248.177,59.748v27.303c0,4.142,3.358,7.5,7.5,7.5h20c4.142,0,7.5-3.358,7.5-7.5V7.5
		C283.177,3.358,279.819,0,275.677,0z"
          />
        </Svg>
      )}
    </a>
  ) : (
    <Link
      id={props.id}
      className={props.className}
      title={props.title}
      to={props.to + (!props.to.includes("?") && search)}
      onClick={props.onClick || null}
      aria-label={props["aria-label"]}
    >
      {props.children}
    </Link>
  );
}
