import React from 'react'

import Contact from 'components/layout/Contact'

export default function ContactWrapper(props) {
  return (
    <Contact
      small={props.small}
      options={[
        {
          value: 'Imprecision',
          label: `Le calcul n'est pas assez précis`,
          disclaimer: `Ce simulateur propose un calcul simplifié afin de donner une idée d'ordre de grandeur. Réalisez votre bilan carbone sur Nos Gestes Climat afin d'obtenir un résultat plus précis.`,
        },
      ]}
    />
  )
}
