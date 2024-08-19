import React, { useRef } from "react";
import styled from "styled-components";

import MapWrapper from "components/misc/MapWrapper";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  ${(props) => props.LVAOMapIsDisplayed && "border-radius: 1rem;"}
  overflow: hidden;
`;
const IFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`;

const IFrameWrapper = ({ src }) => {
  const iframeRef = useRef(null);

  function handleLoad() {
    iframeRef.current.contentWindow.postMessage("ademe", "*");
  }

  return (
    <IFrame
      id="lvao_iframe"
      allow="geolocation"
      allowFullScreen={true}
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      ref={iframeRef}
      onLoad={handleLoad}
      src={src}
    />
  );
};

export default function Map({ lvaoData, product }) {
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
