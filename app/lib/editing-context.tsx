import { createContext, ReactNode, useContext, useState } from 'react';

interface EditingContextType {
  editingNodeId: string | null;
  setEditingNodeId: (id: string | null) => void;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
}

const EditingContext = createContext<EditingContextType | undefined>(undefined);

export const EditingProvider = ({ children }: { children: ReactNode }) => {
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <EditingContext.Provider
      value={{ editingNodeId, setEditingNodeId, selectedNodeId, setSelectedNodeId }}
    >
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = () => {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error('useEditing must be used within an EditingProvider');
  }
  return context;
};
