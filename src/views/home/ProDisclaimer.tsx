import React from "react";
import Accordion from "components/base/Accordion";

export default function ProDisclaimer() {
  return (
    <Accordion items={[{ title: "Je suis un professionnel", content: "Actuellement, l’ensemble des recommandations ne concerne que les particuliers. " }]} />
  );
}
