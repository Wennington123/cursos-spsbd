"use client";

import { useEffect, useState } from "react";
import { firebaseEnabled, watchAuth } from "../../lib/firebaseClient.mjs";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(!firebaseEnabled);

  useEffect(() => {
    if (!firebaseEnabled) return;
    let unsub = () => {};
    try {
      unsub = watchAuth((u) => {
        setUser(u);
        setReady(true);
      });
    } catch {
      setReady(true);
    }
    return () => unsub();
  }, []);

  return { user, ready, enabled: firebaseEnabled };
}
