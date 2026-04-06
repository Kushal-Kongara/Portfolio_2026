"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

export default function SplashWrapper() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show splash once per session
    if (!sessionStorage.getItem("splash_seen")) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <SplashScreen
      onDone={() => {
        sessionStorage.setItem("splash_seen", "1");
        setShow(false);
      }}
    />
  );
}
