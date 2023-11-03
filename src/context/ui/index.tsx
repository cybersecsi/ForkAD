import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface ProviderInterface {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const UIContext = createContext<ProviderInterface | null>(null);

const UIProvider = ({ children }: any): any => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

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
