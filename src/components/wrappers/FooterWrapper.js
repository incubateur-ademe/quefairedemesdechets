import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Footer from 'components/layout/Footer'

const StyledFooter = styled(Footer)`
  background-color: transparent;
`
export default function FooterWrapper() {
  return (
    <StyledFooter>
      <h2
        dangerouslySetInnerHTML={{
          __html: `D'ou viennent ces données&#8239;?`,
        }}
      />
      <p>Ce simulateur utilise les données de l'ADEME.</p>
      <p>
        Si vous souhaitez aller plus loin dans votre démarche, vous pouvez{' '}
        <strong>
          calculer votre empreinte sur le climat grace à notre simulateur{' '}
          <MagicLink to={'https://nosgestesclimat.fr/'}>
            Nos Gestes Climat
          </MagicLink>
        </strong>
        .
      </p>
    </StyledFooter>
  )
}
