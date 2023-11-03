import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { BREAKPOINTS } from '@/config';

interface ProviderInterface {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const UIContext = createContext<ProviderInterface | null>(null);

const UIProvider = ({ children }: any): any => {
  const { width } = useWindowSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    if (width && width < BREAKPOINTS.lg) {
      setIsSidebarOpen(false);
    }
  }, [width]);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen: isSidebarOpen,
        setSidebarOpen: setIsSidebarOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
};

export { UIProvider, useUI };
