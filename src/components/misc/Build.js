import React, { useState } from "react";

import { useRebuildSite } from "utils/api";
import TextInput from "components/base/TextInput";
import Button from "components/base/Button";

export default function Build() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const mutation = useRebuildSite();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(false);

        // This password is NOT critical
        if (code === "qfdmd") {
          mutation.mutate();
        } else {
          setError(true);
        }
      }}
    >
      <TextInput
        type="password"
        label={"Code"}
        value={code}
        onChange={({ value }) => setCode(value)}
        error={error}
        required
      />
      <Button>Mettre à jour le site</Button>
      {mutation.isSuccess && <p>Rebuild en cours :)</p>}
    </form>
  );
}
