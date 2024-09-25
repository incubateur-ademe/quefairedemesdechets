import React from "react";
import styled from "styled-components";

const Wrapper = styled.svg`
  position: absolute;
  top: 50%;
  left: 1.5em;
  transform: translateY(-50%);
  width: 2em;
  height: auto;

  ${(props) => props.theme.mq.small} {
    width: 1.5em;
    left: 1em;
  }

  path {
    fill: ${(props) => props.theme.colors.icons.primary};
  }
`;
export default function Glass() {
  return (
    <Wrapper aria-hidden="true" width="30" height="30" viewBox="0 0 30 30">
      <path d="M29.0414 27.3252L21.9013 19.8992C23.7372 17.7169 24.743 14.971 24.743 12.1125C24.743 5.43377 19.3093 0 12.6306 0C5.95183 0 0.518066 5.43377 0.518066 12.1125C0.518066 18.7912 5.95183 24.225 12.6306 24.225C15.1378 24.225 17.5272 23.4687 19.57 22.0331L26.7642 29.5155C27.065 29.8278 27.4694 30 27.9028 30C28.3131 30 28.7022 29.8436 28.9977 29.5592C29.6254 28.9552 29.6454 27.9535 29.0414 27.3252ZM12.6306 3.15978C17.5672 3.15978 21.5833 7.17586 21.5833 12.1125C21.5833 17.0491 17.5672 21.0652 12.6306 21.0652C7.69393 21.0652 3.67785 17.0491 3.67785 12.1125C3.67785 7.17586 7.69393 3.15978 12.6306 3.15978Z" />
    </Wrapper>
  );
}
