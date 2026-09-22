"use client";

import { useEffect, useState } from "react";
import { firebaseEnabled, watchProgress } from "../../lib/firebaseClient.mjs";

export function useProgress(user) {
  const [progress, setProgress] = useState({ units: {} });

  useEffect(() => {
    if (!firebaseEnabled || !user) {
      setProgress({ units: {} });
      return;
    }
    let unsub = () => {};
    try {
      unsub = watchProgress(user.uid, setProgress);
    } catch {
      /* Firebase indisponível */
    }
    return () => unsub();
  }, [user]);

  return progress;
}
