import React, { useContext } from 'react'

import WasteContext from 'utils/WasteContext'
import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  let { product } = useContext(WasteContext)
  return (
    <Share
      small={props.small}
      messages={{
        simulator: {
          title: 'Que faire de mes déchets',
          message:
            'Vous voulez vérifier si vous respectez bien les consignes de tri pour vos emballages, pots de peinture ou médicaments ? Vous vous demandez où apporter vos appareils électriques, votre ordinateur ou vos vêtements ? Toutes les réponses sont ici',
        },
        result: {
          title: `Que faire de mes déchets - ${product && product['Nom']}`,
          message: `Je viens de découvrir comment jeter ${
            product && product['Nom']
          }, ce qu'il va devenir mais aussi comment l'éviter. Je pense que cela pourra aussi t'intéresser, n'hésite pas à voir tous les détails sur ce site de l'ADEME.`,
        },
      }}
    />
  )
}
