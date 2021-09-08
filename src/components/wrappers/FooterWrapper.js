import React from 'react'

import MagicLink from 'components/base/MagicLink'
import Footer from 'components/layout/Footer'

export default function FooterWrapper() {
  return (
    <Footer>
      <h2
        dangerouslySetInnerHTML={{
          __html: `D'ou viennent ces données&#8239;?`,
        }}
      />
      <p>
        Ce simulateur utilise les données de l'ADEME. Il s'agit de données à
        l'échelle nationale.
      </p>
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
    </Footer>
  )
}
