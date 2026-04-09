"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextType {
  isCallActive: boolean;
  setIsCallActive: (active: boolean) => void;
  volumeLevel: number;
  setVolumeLevel: (level: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  return (
    <AudioContext.Provider value={{ isCallActive, setIsCallActive, volumeLevel, setVolumeLevel }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
