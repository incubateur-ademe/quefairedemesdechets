import React, { useEffect } from "react";
import { setCookie } from "utils/cookies"
import Web from "components/layout/Web";

export default function Disableposthog() {
  useEffect(() => {
    setCookie("disable-posthog", "1", 365)
    window.location.href = "/"
  }, []);

  return (
    <Web>
    Un cookie est en train d'être déposé.
    Vous allez être redirigé vers la page d'accueil.
    </Web>
  );
}
