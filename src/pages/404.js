import React from "react";

import Web from "components/layout/Web";
import Suggestions from "components/misc/Suggestions";

export default function notfound() {
  return (
    <Web>
      <Suggestions>
        Ce déchet n'existe pas :(
        <br />
        Essayez une des suggestions ci dessous.
      </Suggestions>
    </Web>
  );
}
