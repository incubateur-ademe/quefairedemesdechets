import React, { useRef } from "react";
import styled from "styled-components";

import LegacyMapWrapper from "components/misc/MapWrapper";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: clamp(20rem, 85vh, 44rem);
  ${(props) => props.$LVAOMapIsDisplayed && "border-radius: 1rem;"}
  overflow: hidden;
`;
const IFrame = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
`;

const LVAOMapWrapper = ({ src }) => {
  const iframeRef = useRef(null);

  function handleLoad() {
    iframeRef.current.contentWindow.postMessage("ademe", "*");
  }

  return (
    <IFrame
      id="lvao_iframe"
      allow="geolocation; clipboard-write"
      allowFullScreen={true}
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      ref={iframeRef}
      onLoad={handleLoad}
      referrerPolicy="strict-origin-when-cross-origin"
      src={src}
    />
  );
};

export default function Map({ lvaoData, product }) {
  return (
    <Wrapper $LVAOMapIsDisplayed={!!lvaoData?.url_carte}>
      {lvaoData?.url_carte ? (
        <LVAOMapWrapper src={lvaoData.url_carte} />
      ) : (
        <LegacyMapWrapper product={product} />
      )}
    </Wrapper>
  );
}
