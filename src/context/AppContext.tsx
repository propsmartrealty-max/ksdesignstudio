
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <AppContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
