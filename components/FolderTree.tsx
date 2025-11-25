import React, { useState } from 'react';
import { Folder, FolderPlus, ChevronRight, ChevronDown, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Folder as FolderType } from '../types';

interface FolderTreeProps {
  folders: FolderType[];
  selectedFolderId?: string;
  onSelectFolder: (folderId?: string) => void;
  onAddFolder: (name: string, parentId?: string) => void;
  onUpdateFolder: (id: string, name: string) => void;
  onDeleteFolder: (id: string) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = ({
  folders,
  selectedFolderId,
  onSelectFolder,
  onAddFolder,
  onUpdateFolder,
  onDeleteFolder,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedFolders(newExpanded);
  };

  const rootFolders = folders.filter(f => !f.parentId);

  const renderFolder = (folder: FolderType, level = 0) => {
    const children = folders.filter(f => f.parentId === folder.id);
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = selectedFolderId === folder.id;
    const isEditing = editingId === folder.id;

    return (
      <div key={folder.id}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer group ${
            isSelected ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {children.length > 0 && (
            <button onClick={() => toggleExpand(folder.id)} className="p-0.5">
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          )}
          <Folder className="w-4 h-4 text-emerald-500" />
          {isEditing ? (
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => {
                if (editName.trim()) onUpdateFolder(folder.id, editName);
                setEditingId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (editName.trim()) onUpdateFolder(folder.id, editName);
                  setEditingId(null);
                }
              }}
              className="flex-1 bg-transparent text-sm focus:outline-none"
              autoFocus
            />
          ) : (
            <span
              onClick={() => onSelectFolder(folder.id)}
              className="flex-1 text-sm truncate"
            >
              {folder.name}
            </span>
          )}
          <div className="opacity-0 group-hover:opacity-100 flex gap-1">
            <button
              onClick={() => {
                setEditingId(folder.id);
                setEditName(folder.name);
              }}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => onDeleteFolder(folder.id)}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
            >
              <Trash2 className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>
        {isExpanded && children.map(child => renderFolder(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Folders</h3>
        <button
          onClick={() => {
            const name = prompt('Folder name:');
            if (name) onAddFolder(name);
          }}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          title="New Folder"
        >
          <FolderPlus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={() => onSelectFolder(undefined)}
        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
          !selectedFolderId ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <Folder className="w-4 h-4" />
        All Notes
      </button>
      {rootFolders.map(folder => renderFolder(folder))}
    </div>
  );
};
