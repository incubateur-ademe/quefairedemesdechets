import React from "react";
import styled from "styled-components";

import MapWrapper from "components/misc/MapWrapper";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: clamp(20rem, 75vh, 35rem);
  ${(props) => props.LVAOMapIsDisplayed && "border-radius: 1rem;"}
  overflow: hidden;
`;
const IFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`;

const IFrameWrapper = ({ src }) => {
  return (
    <IFrame
      id="lvao_iframe"
      allow="geolocation"
      allowFullScreen={true}
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      src={src}
    />
  );
};

export default function Map({ lvaoData, product }) {
  console.log({ lvaoData });
  return (
    <Wrapper LVAOMapIsDisplayed={!!lvaoData?.url_carte}>
      {lvaoData?.url_carte ? (
        <IFrameWrapper src={lvaoData.url_carte} />
      ) : (
        <MapWrapper product={product} />
      )}
    </Wrapper>
  );
}
