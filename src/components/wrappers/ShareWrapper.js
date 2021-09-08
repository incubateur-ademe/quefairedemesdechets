import React from 'react'

import useProduct from 'hooks/useProduct'
import Share from 'components/layout/Share'

export default function ShareWrapper(props) {
  let { product } = useProduct()
  return (
    <Share
      small={props.small}
      messages={{
        mail: {
          simulator: {
            subject: `Découvrez & intégrez le simulateur de l'ADEME Que faire de mes déchets !`,
            body: `Bonjour,
            
Vous souhaitez aider votre communauté ou collaborateurs à savoir plus facilement où jeter leurs déchets, et comment les limiter ?
            
Le site Que Faire de mes Déchets permet de savoir quoi faire de vos déchets, de savoir ce qu'ils vont devenir et comment les éviter. 

Découvrez le ici : `,
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
            quote:
              'Vous voulez être sûr de bien respecter les consignes de tri pour vos emballages ? Vous vous demandez où apporter vos appareils électriques ? Grâce au simulateur Datagir, retrouvez toutes les réponses à ces questions !',
          },
          result: {
            quote: `${product && product['Nom']} - Que faire de mes déchets`,
          },
        },
        twitter: {
          simulator: {
            title:
              'Vous voulez être sûr de bien respecter les consignes de tri pour vos emballages ? Vous vous demandez où apporter vos appareils électriques ? Grâce au simulateur Datagir, retrouvez toutes les réponses à ces questions !',
          },
          result: {
            title: `${product && product['Nom']} - Que Faire de mes déchets`,
          },
        },
        linkedin: {
          simulator: {
            source: 'Que Faire de mes Déchets',
            title:
              'Retrouvez les consignes de tri de tous les déchets et intégrez cet outil à votre site ! 💻♻🌍',
            summary:
              'Vous souhaitez aider votre communauté ou collaborateurs à savoir plus facilement où jeter leurs déchets, et comment les limiter ? Faites-leur découvrir Que faire de mes déchets !  Ce simulateur aussi intégrable librement en iframe sur vos plateformes web & mobiles, de quoi toucher largement les visiteurs de votre site !',
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
