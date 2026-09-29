import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { appDb } from '../db/tinyDb';

const NAME_KEY = 'nombre';

type UserContextValue = {
  name: string | null;
  isLoading: boolean;
  storagePath: string;
  saveName: (name: string) => void;
  forgetName: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    try {
      const stored = appDb.get<string>(NAME_KEY);

      if (active && typeof stored === 'string' && stored.trim()) {
        setName(stored.trim());
      }
    } catch {
      if (active) {
        setName(null);
      }
    } finally {
      if (active) {
        setIsLoading(false);
      }
    }

    return () => {
      active = false;
    };
  }, []);

  const saveName = useCallback((value: string) => {
    const clean = value.trim();
    setName(clean);

    try {
      appDb.put(NAME_KEY, clean);
    } catch {
      return;
    }
  }, []);

  const forgetName = useCallback(() => {
    setName(null);

    try {
      appDb.remove(NAME_KEY);
    } catch {
      return;
    }
  }, []);

  const value = useMemo(() => {
    let path = 'almacenamiento no disponible';

    try {
      path = appDb.storagePath;
    } catch {
      path = 'almacenamiento no disponible';
    }

    return { name, isLoading, storagePath: path, saveName, forgetName };
  }, [name, isLoading, saveName, forgetName]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }

  return context;
}
