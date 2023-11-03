import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { BREAKPOINTS } from '@/config';

interface ProviderInterface {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
  isHuge: boolean;
}

const UIContext = createContext<ProviderInterface | null>(null);

const UIProvider = ({ children }: any): any => {
  const { width } = useWindowSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerrOpen] = useState<boolean>(false);

  useEffect(() => {
    if (width && width < BREAKPOINTS.lg) {
      setIsSidebarOpen(false);
    }
  }, [width]);

  useEffect(() => {
    isDrawerOpen
      ? document.documentElement.classList.add('overflow-hidden')
      : document.documentElement.classList.remove('overflow-hidden');
  }, [isDrawerOpen]);

  const isSmall = useMemo<boolean>(() => (width ? width < BREAKPOINTS.sm : false), [width]);
  const isMedium = useMemo<boolean>(() => (width ? width < BREAKPOINTS.md : false), [width]);
  const isLarge = useMemo<boolean>(() => (width ? width < BREAKPOINTS.lg : false), [width]);
  const isExtraLarge = useMemo<boolean>(() => (width ? width < BREAKPOINTS.xl : false), [width]);
  const isHuge = useMemo<boolean>(() => (width ? width < BREAKPOINTS['2xl'] : false), [width]);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen: isSidebarOpen,
        setSidebarOpen: setIsSidebarOpen,
        drawerOpen: isDrawerOpen,
        setDrawerOpen: setIsDrawerrOpen,
        isSmall: isSmall,
        isMedium: isMedium,
        isLarge: isLarge,
        isExtraLarge: isExtraLarge,
        isHuge: isHuge,
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
