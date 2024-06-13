import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div``
const Title = styled.h2`
  margin-bottom: 1.25rem;
`
const StyledLink = styled(MagicLink)`
  display: flex;
  align-items: flex-start;
  margin: 0 2rem 1.5rem;
  text-decoration: none;

  &:hover span {
    text-decoration: underline;
  }

  ${(props) => props.theme.mq.small} {
    margin: 0 0 1.5rem;
  }
`
const Icon = styled.svg`
  width: 1rem;
  height: auto;
  margin: 0.15rem 0.5rem 0 0;

  path {
    fill: ${(props) => props.theme.colors.main};
  }
`
const Text = styled.div`
  flex: 1;
`
const Big = styled.span`
  display: block;
  text-decoration: underline;
`
const Small = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function Links(props) {
  return props.product.links?.length ? (
    <Wrapper>
      <Title>En Savoir Plus</Title>
      {props.product.links.map((link, index) => (
        <StyledLink
          key={`${link['URL']}-${index}`}
          to={link['URL']}
          onClick={() =>
            window._paq?.push(['trackEvent', 'Misc', 'Link', link['URL']])
          }
        >
          <Icon x='0px' y='0px' viewBox='0 0 283.922 283.922'>
            <path
              d='M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374
		c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13
		c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5
		C283.922,7.851,276.071,0,266.422,0z'
            />
            <path
              d='M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137
		c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z'
            />
          </Icon>
          <Text>
            <Big
              dangerouslySetInnerHTML={{
                __html: link['Titre_du_lien'],
              }}
            />
            {link['Description'] && (
              <Small
                dangerouslySetInnerHTML={{
                  __html: link['Description'],
                }}
              />
            )}
          </Text>
        </StyledLink>
      ))}
    </Wrapper>
  ) : null
}
