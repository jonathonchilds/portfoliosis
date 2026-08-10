import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
interface AnimationContextType {
  ufoEnabled: boolean;
  blobEnabled: boolean;
  toggleUfo: () => void;
  toggleBlob: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [ufoEnabled, setUfoEnabled] = useState(true);
  const [blobEnabled, setBlobEnabled] = useState(true);

  const toggleUfo = () => setUfoEnabled(prev => !prev);
  const toggleBlob = () => setBlobEnabled(prev => !prev);

  return (
    <AnimationContext.Provider value={{ ufoEnabled, blobEnabled, toggleUfo, toggleBlob }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimationState() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimationState must be used within an AnimationProvider');
  }
  return context;
}
