import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import ThemeToggle from 'components/base/ThemeToggle'
import ContactPrompt from 'components/base/ContactPrompt'
import Button from 'components/base/Button'
import Marianne from 'components/base/Marianne'
import Ademe from 'components/base/Ademe'
import MobileButtons from './footer/MobileButtons'

const Wrapper = styled.footer`
  position: relative;
  background-color: ${(props) =>
    props.theme.colors[props.background || 'footer']};
  transition: all 600ms;
`
const Content = styled.div`
  max-width: ${(props) => props.width || '37rem'};
  margin: 0 auto;
  padding: 2rem 1rem 1rem;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;

  p {
    width: 100%;
  }
  h2,
  h3 {
    width: 100%;
    font-size: 1.75rem;
  }
`
const MobileSection = styled(Section)`
  display: none;
  ${(props) => props.theme.mq.medium} {
    display: flex;
  }
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  background-color: #fff;
`
const Accessibility = styled(MagicLink)`
  display: block;
  margin: 0;
  padding-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.background};
`
export default function Footer(props) {
  return (
    <Wrapper
      className={props.className}
      background={props.background}
      id='about'
    >
      <Content>
        <MobileButtons iframe={props.iframe} />
        <Section>
          {props.iframe && (
            <Button to={process.env.GATSBY_URL}>
              En savoir plus sur ce simulateur
            </Button>
          )}
        </Section>
        <MobileSection>
          <ThemeToggle mobile />
        </MobileSection>
        {!props.iframe && (
          <>
            <Section>{props.children}</Section>
            <Section>
              <ContactPrompt />
            </Section>
            <Section>
              <h2>Qui sommes-nous ?</h2>
              <p>
                <MagicLink to='https://quefairedemesdechets.ademe.fr/'>
                  <strong>Que faire de mes déchets</strong>
                </MagicLink>{' '}
                est un <strong>service public gratuit</strong>, porté par l’
                <MagicLink to='https://www.ademe.fr/'>ADEME</MagicLink> et
                l’incubateur de la DINUM{' '}
                <MagicLink to='https://beta.gouv.fr/'>beta.gouv.fr</MagicLink>.
              </p>
              <p>
                Notre mission est de{' '}
                <strong>
                  diffuser les informations et données environnementales en
                  open-data de l’ADEME
                </strong>{' '}
                pour encourager l’amélioration continue et l’innovation. Pour
                cela,{' '}
                <strong>
                  nous accompagnons toutes les applications & services dans leur
                  démarche responsable
                </strong>{' '}
                par l'appropriation et l’intégration de ces données afin
                d’apporter l’information au plus près des citoyens.
              </p>
            </Section>
            <Section>
              <h2>Comment contribuer au développement de nos outils ?</h2>
              <p>
                Pour contribuer à la conception et au développement de nos outils,
                rien de plus simple,{' '}
                <strong>
                   <MagicLink to='https://tally.so/r/wvNgx0'>
                  participez à notre enquête
                  </MagicLink>{' '} 
                  et renseignez votre adresse e-mail à la fin si vous le souhaitez
                </strong>
                  , notre équipe vous reconcatera pour vous présenter
                  les dernières avancées et{' '}
                <strong>
                  vous faire participer à des sessions 
                  de tests et de découvertes des fonctionnalités à venir ! 
                </strong>{' '}
                 Ce sera aussi l'occasion pour vous de nous faire part de vos retours d'expériences
                sur l'utilisation de nos outils. Votre participation est importante pour s'assurer
                que nous développons un outil pertinent et efficace pour vos besoins. 
              </p>
              <p>
                Notre mission est de{' '}
                <strong>
                  diffuser les informations et données environnementales en
                  open-data de l’ADEME
                </strong>{' '}
                pour encourager l’amélioration continue et l’innovation. Pour
                cela,{' '}
                <strong>
                  nous accompagnons toutes les applications & services dans leur
                  démarche responsable
                </strong>{' '}
                par l'appropriation et l’intégration de ces données afin
                d’apporter l’information au plus près des citoyens.
              </p>
            </Section>
          </>
        )}
      </Content>
      {!props.iframe && (
        <>
          <LogosWrapper>
            <Logos
                to='https://ademe.fr/'
                aria-label='ademe.fr'
              noIcon
            >
              <Marianne />
              <Ademe />
            </Logos>
          </LogosWrapper>
          <Accessibility to='/accessibilite'>
            Accessibilité : partiellement conforme
          </Accessibility>
        </>
      )}
    </Wrapper>
  )
}
