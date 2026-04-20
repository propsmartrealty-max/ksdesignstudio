
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project, Material } from '../types';
import { safeStorageGet, safeStorageSet } from '../utils/storage';

interface AppContextType {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  shortlistedProjects: Project[];
  shortlistedMaterials: Material[];
  toggleProjectShortlist: (project: Project) => void;
  toggleMaterialShortlist: (material: Material) => void;
  isProjectShortlisted: (id: string) => boolean;
  isMaterialShortlisted: (name: string) => boolean;
  vaultCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [shortlistedProjects, setShortlistedProjects] = useState<Project[]>([]);
  const [shortlistedMaterials, setShortlistedMaterials] = useState<Material[]>([]);
  const [vaultCount, setVaultCount] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    setShortlistedProjects(safeStorageGet('KS_SAVED_PROJECTS', []));
    setShortlistedMaterials(safeStorageGet('KS_SAVED_MATERIALS', []));
  }, []);

  // Update vault count whenever items change
  useEffect(() => {
    const styleData = safeStorageGet('KS_STYLE_DNA', null) ? 1 : 0;
    const paletteData = safeStorageGet('KS_PALETTE_DNA', null) ? 1 : 0;
    const spatialData = safeStorageGet<any[]>('KS_SPATIAL_AUDITS', []).length;
    
    setVaultCount(shortlistedProjects.length + shortlistedMaterials.length + styleData + paletteData + spatialData);
    
    safeStorageSet('KS_SAVED_PROJECTS', shortlistedProjects);
    safeStorageSet('KS_SAVED_MATERIALS', shortlistedMaterials);
  }, [shortlistedProjects, shortlistedMaterials]);

  const toggleProjectShortlist = (project: Project) => {
    setShortlistedProjects(prev => 
      prev.find(p => p.id === project.id) 
        ? prev.filter(p => p.id !== project.id) 
        : [...prev, project]
    );
  };

  const toggleMaterialShortlist = (material: Material) => {
    setShortlistedMaterials(prev => 
      prev.find(m => m.name === material.name) 
        ? prev.filter(m => m.name !== material.name) 
        : [...prev, material]
    );
  };

  const isProjectShortlisted = (id: string) => shortlistedProjects.some(p => p.id === id);
  const isMaterialShortlisted = (name: string) => shortlistedMaterials.some(m => m.name === name);

  return (
    <AppContext.Provider value={{ 
      isAdmin, setIsAdmin, 
      shortlistedProjects, shortlistedMaterials, 
      toggleProjectShortlist, toggleMaterialShortlist,
      isProjectShortlisted, isMaterialShortlisted,
      vaultCount 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
