"use client";

import { useEffect, useState } from "react";
import { firebaseEnabled, watchProgress } from "../../lib/firebaseClient.mjs";

export function useProgress(user) {
  const [progress, setProgress] = useState({ units: {} });
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!firebaseEnabled || !user) {
      setProgress({ units: {} });
      setErro(null);
      return;
    }

    setErro(null);
    let cancelar = () => {};
    try {
      cancelar = watchProgress(
        user.uid,
        setProgress,
        (e) => setErro(e?.message || String(e))
      );
    } catch (e) {
      setErro(e?.message || String(e));
    }
    return () => cancelar();
  }, [user]);

  return { progress, erro };
}
