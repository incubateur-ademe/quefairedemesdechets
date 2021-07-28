import React, { useContext } from 'react'

import WasteContext from 'utils/WasteContext'
import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  let { product } = useContext(WasteContext)
  return (
    <Share
      small={props.small}
      messages={{
        mail: {
          simulator: {
            subject: 'Que faire de mes déchets',
            body: `Salut,

Je viens de découvrir le site Que Faire de mes Déchets. Il te permet de savoir quoi faire de n'importe quel déchet ; et aussi de savoir ce qu'il va devenir et comment l'éviter. 

Je pense que cela pourra aussi t'intéresser, n'hésite pas à le visiter ici : http://www.quefairedemesdechets.fr/`,
          },
          result: {
            subject: `Que faire de mes déchets - ${product && product['Nom']}`,
            body: `Je viens de découvrir comment jeter ${
              product && product['Nom']
            }, ce qu'il va devenir mais aussi comment l'éviter. Je pense que cela pourra aussi t'intéresser, n'hésite pas à voir tous les détails sur ce site de l'ADEME.`,
          },
        },
        facebook: {
          simulator: {
            quote: 'Decouvrez que faire de vos déchets !',
          },
          result: {
            quote: `${product && product['Nom']} - Que faire de mes déchets`,
          },
        },
        twitter: {
          simulator: {
            title: 'Que Faire de mes Déchets',
          },
          result: {
            title: `${product && product['Nom']} - Que Faire de mes déchets`,
          },
        },
        linkedin: {
          simulator: {
            source: 'Que Faire de mes Déchets',
            title: '',
            summary:
              'Vous voulez vérifier si vous respectez bien les consignes de tri pour vos emballages, pots de peinture ou médicaments ? Vous vous demandez où apporter vos appareils électriques, votre ordinateur ou vos vêtements ? Toutes les réponses sont ici',
          },
          result: {
            source: `Que faire de mes Déchets`,
            title: `${product && product['Nom']}`,
            summary:
              'Vous voulez vérifier si vous respectez bien les consignes de tri pour vos emballages, pots de peinture ou médicaments ? Vous vous demandez où apporter vos appareils électriques, votre ordinateur ou vos vêtements ? Toutes les réponses sont ici',
          },
        },
        whatsapp: {
          simulator: {
            title: 'Que Faire de mes Déchets',
          },
          result: {
            title: `${product && product['Nom']} - Que faire de mes déchets`,
          },
        },
      }}
    />
  )
}
