import React from "react";

import MagicLink from "components/base/MagicLink";
import Web from "components/layout/Web";

export default function accessibilite() {
  return (
    <Web>
      <h1>Déclaration d’accessibilité</h1>
      <p>
        L’ADEME s’engage à rendre ses sites internet accessibles conformément à
        l’article 47 de la loi n° 2005-102 du 11 février 2005.
        <br />
        La présente déclaration d’accessibilité s’applique au site Que Faire de
        mes Déchets.
      </p>
      <h2>État de conformité</h2>
      <p>
        Le site Que Faire de mes Déchets
        (https://quefairedemesdechets.ademe.fr/) est conforme avec le
        référentiel général d’amélioration de l’accessibilité, RGAA version 4.1,
        en raison des non-conformités énumérées dans la section « Résultats des
        tests ».
      </p>
      <h2>Résultats des tests</h2>
      <p>
        L’audit de conformité réalisé le 28/02/2022 par la société Access42
        révèle que le site est conforme à 69,23 % au RGAA version 4.1.
      </p>
      <h3>Contenus inaccessibles</h3>
      <p>
        Les contenus listés ci-dessous ne sont pas accessibles pour les raisons
        suivantes.
      </p>
      <h4>Non-conformités</h4>
      <ul>
        <li>Des informations sont véhiculées uniquement par la couleur ;</li>
        <li>
          Des fonctionnalités JavaScript ne sont pas compatibles avec les
          technologies d’assistance (notamment des boutons, des fenêtres modales
          et des champs en autocomplétion), ou font un usage inapproprié de
          propriétés ARIA ;
        </li>
        <li>Des pages contiennent des erreurs de code source ;</li>
        <li>
          Des pages font usage de balises à des fins de présentation (par
          exemple des textes non structurés dans des balises de paragraphes) ;
        </li>
        <li>
          Des pages ont une hiérarchie de titres non pertinente (titres
          manquants ou mal définis) ;
        </li>
        <li>
          La structure et les zones principales des pages sont mal définies ;
        </li>
        <li>Des suites d’éléments ne sont pas structurées avec des listes ;</li>
        <li>Des indications visuelles de prise de focus sont désactivées ;</li>
        <li>
          Certains contenus additionnels apparaissant au survol ne sont pas
          contrôlables par l’utilisateur ;
        </li>
        <li>
          Des champs de formulaires n'ont pas d'étiquette correctement liée ;
        </li>
        <li>
          Des aides à la saisie sont absentes pour les champs qui attendent un
          format particulier, et des champs obligatoires ne sont pas
          correctement indiqués ;
        </li>
        <li>
          Certains champs de formulaire qui attendent une donnée personnelle de
          l'utilisateur ne sont pas identifiés ;
        </li>
        <li>
          Il manque un système de navigation alternatif au moteur de recherche ;
        </li>
        <li>
          Des pages présentent des problèmes dans le parcours de tabulation en
          raison d’éléments masqués.
        </li>
      </ul>
      <h4>Contenus non soumis à l’obligation d’accessibilité</h4>
      <ul>
        <li>
          Les cartes de certaines pages déchet (motif : carte avec alternative).
        </li>
      </ul>
      <h2>Établissement de cette déclaration d’accessibilité</h2>
      <p>Cette déclaration a été établie le 27/05/2022.</p>
      <h3>Technologies utilisées pour la réalisation du site</h3>
      <ul>
        <li>HTML5</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
      <h3>
        Agents utilisateurs, technologies d’assistance et outils utilisés pour
        vérifier l’accessibilité
      </h3>
      <p>
        Les tests des pages web ont été effectués avec les combinaisons de
        navigateurs web et lecteurs d’écran suivants :
      </p>
      <ul>
        <li>Firefox 97 et NVDA 2021.3 ;</li>
        <li>Firefox 97 et JAWS 2020 ;</li>
        <li>Safari 15.0 et VoiceOver (macOS Big Sur, version 11.6) ;</li>
        <li>Chrome 96.0 et TalkBack (Android natif 10.0).</li>
      </ul>
      <p>
        La vérification de l’accessibilité est le résultat de tests manuels,
        assistés par des outils (feuilles CSS dédiés, extensions HeadingsMaps et
        WebDeveloper Toolbar, Color Contrast Analyser).
      </p>
      <h3>Pages du site ayant fait l’objet de la vérification de conformité</h3>
      <ul>
        <li>Accueil : https://quefairedemesdechets.ademe.fr/</li>
        <li>Câble : https://quefairedemesdechets.ademe.fr/dechet/cable</li>
      </ul>
      <h2>Retour d’information et contact</h2>
      <p>
        Il est important de rappeler qu’en vertu de l’article 11 de la loi de
        février 2005 :
        <br />
        <blockquote>
          « la personne handicapée a droit à la compensation des conséquences de
          son handicap, quels que soient l’origine et la nature de sa
          déficience, son âge ou son mode de vie. »
        </blockquote>
        <br />
        L’ADEME s'engage à prendre les moyens nécessaires afin de donner accès,
        dans un délai raisonnable, aux informations et fonctionnalités
        recherchées par la personne handicapée, que le contenu fasse l'objet
        d'une dérogation ou non. L’ADEME invite les personnes qui
        rencontreraient des difficultés à la contacter (rgaa@ademe.fr) afin
        qu’une assistance puisse être apportée (alternative accessible,
        information et contenu donnés sous une autre forme).
      </p>
      <h2>Voies de recours</h2>
      <p>
        Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à
        un contenu ou une fonctionnalité du site, que vous nous le signalez et
        que vous ne parvenez pas à obtenir une réponse de notre part, vous êtes
        en droit de faire parvenir vos doléances ou une demande de saisine au
        Défenseur des droits. Plusieurs moyens sont à votre disposition :
      </p>
      <ul>
        <li>
          <MagicLink to="https://formulaire.defenseurdesdroits.fr/defenseur/code/afficher.php?ETAPE=informations">
            un formulaire de contact
          </MagicLink>{" "}
          ;
        </li>
        <li>
          <MagicLink to="https://www.defenseurdesdroits.fr/office/">
            la liste du ou des délégués de votre région
          </MagicLink>{" "}
          avec leurs informations de contact direct ;
        </li>
        <li>un numéro de téléphone : 09 69 39 00 00 ;</li>
        <li>
          une adresse postale (courrier gratuit, sans affranchissement) : Le
          Défenseur des droits - Libre réponse 71120 - 75342 Paris CEDEX 07.
        </li>
      </ul>
    </Web>
  );
}
