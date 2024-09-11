import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Accordion from "../src/components/base/Accordion";

test("Accordion : un clic sur le titre affiche le contenu", async () => {
  render(
    <Accordion
      items={[
        {
          title: "Je suis un professionnel",
          content:
            "Actuellement, l’ensemble des recommandations ne concerne que les particuliers. ",
        },
      ]}
    />,
  );

  expect(screen.getByTestId("accordion-content")).not.toBeVisible();
  await userEvent.click(screen.getByTestId("accordion-button"));
  expect(screen.getByTestId("accordion-content")).toBeVisible();
});
