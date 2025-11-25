import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Folder } from '../types';

interface FolderContextType {
  folders: Folder[];
  addFolder: (name: string, parentId?: string) => void;
  updateFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useLocalStorage<Folder[]>('notara-folders', []);

  const addFolder = (name: string, parentId?: string) => {
    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name,
      parentId,
      createdAt: Date.now(),
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const updateFolder = (id: string, name: string) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, name } : f));
  };

  const deleteFolder = (id: string) => {
    setFolders(prev => prev.filter(f => f.id !== id && f.parentId !== id));
  };

  return (
    <FolderContext.Provider value={{ folders, addFolder, updateFolder, deleteFolder }}>
      {children}
    </FolderContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FolderContext);
  if (!context) throw new Error('useFolders must be used within FolderProvider');
  return context;
};
