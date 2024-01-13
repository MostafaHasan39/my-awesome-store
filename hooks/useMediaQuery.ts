"use client";
import { useState, useEffect } from "react";

export const useMediaQuery = (width: number, initialState: boolean = false) => {
  const [targetReached, setTargetReached] = useState(initialState);

  useEffect(() => {
    const updateTarget = (e: Event | MediaQueryList) => {
      if ((e as MediaQueryList).matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    };
    const media = window.matchMedia(`(max-width: ${width}px)`);

    updateTarget(media);

    try {
      media?.addEventListener("change", updateTarget);
    } catch (error) {
      if (typeof media?.addListener === "function") {
        media?.addListener(updateTarget);
      }
    }

    return () => {
      try {
        media?.removeEventListener("change", updateTarget);
      } catch (error) {
        if (typeof media?.removeListener === "function") {
          media?.removeListener(updateTarget);
        }
      }
    };
  }, [width]);

  return targetReached;
};
