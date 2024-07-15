import React from "react";
import styled from "styled-components";

import useDeviceDetect from "hooks/useMobileDetect";
import MagicLink from "components/base/MagicLink";

const Wrapper = styled.div`
  position: relative;
  width: 16rem;
  min-height: 10rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.text};
  border-radius: 1rem;
  user-select: text;
  pointer-events: initial;
`;
const Handle = styled.svg`
  position: absolute;
  top: calc(100% - 0.4rem);
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: auto;
  & path {
    stroke: ${(props) => props.theme.colors.text};
    fill: ${(props) => props.theme.colors.background};
  }
`;
export const Title = styled.h3`
  margin-bottom: 0.5rem;
`;
export const Address = styled.address`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;
export const Hours = styled.p`
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
`;
export default function Place(props) {
  const { isMobile } = useDeviceDetect();

  return (
    <Wrapper>
      <Title>{props.place.title}</Title>
      {props.place.hours && (
        <Hours
          dangerouslySetInnerHTML={{
            __html: props.place.hours,
          }}
        />
      )}
      <Address
        dangerouslySetInnerHTML={{
          __html: props.place.address,
        }}
      />
      <MagicLink
        to={
          !isMobile
            ? `https://www.google.com/maps/dir/?api=1&origin=${props.address.latitude},${props.address.longitude}&destination=${props.place.latitude},${props.place.longitude}`
            : `geo:${props.place.latitude},${props.place.longitude}?q=${
                props.place.latitude
              },${props.place.longitude}(${props.place.address.replaceAll(
                "<br/>",
                "",
              )})`
        }
      >
        Voir l'itinéraire
      </MagicLink>
      <Handle width="967" height="987" viewBox="0 0 967 987">
        <path
          d="M64.7762 241.75L483.499 967L902.223 241.75"
          strokeWidth="100"
        />
      </Handle>
    </Wrapper>
  );
}
