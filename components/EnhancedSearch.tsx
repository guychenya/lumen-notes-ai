import React, { useState } from 'react';
import { Search, X, Calendar, Tag, Star } from 'lucide-react';
import { Note } from '../types';

interface EnhancedSearchProps {
  notes: Note[];
  onSelectNote: (noteId: string) => void;
  onClose: () => void;
}

export const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ notes, onSelectNote, onClose }) => {
  const [query, setQuery] = useState('');
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [filterTag, setFilterTag] = useState('');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const allTags = Array.from(new Set(notes.flatMap(n => n.tags || [])));

  const filteredNotes = notes.filter(note => {
    const matchesQuery = query === '' || 
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase());
    
    const matchesFavorite = !filterFavorites || note.isFavorite;
    const matchesTag = !filterTag || note.tags?.includes(filterTag);
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const now = Date.now();
      const noteDate = note.updatedAt;
      const day = 24 * 60 * 60 * 1000;
      
      if (dateRange === 'today') matchesDate = now - noteDate < day;
      else if (dateRange === 'week') matchesDate = now - noteDate < 7 * day;
      else if (dateRange === 'month') matchesDate = now - noteDate < 30 * day;
    }
    
    return matchesQuery && matchesFavorite && matchesTag && matchesDate;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes..."
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none"
              autoFocus
            />
            <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterFavorites(!filterFavorites)}
              className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
                filterFavorites ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <Star className="w-3 h-3" /> Favorites
            </button>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 border-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            
            {allTags.length > 0 && (
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 border-none"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No notes found</div>
          ) : (
            filteredNotes.map(note => (
              <button
                key={note.id}
                onClick={() => {
                  onSelectNote(note.id);
                  onClose();
                }}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-2 mb-1">
                  {note.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{note.title || 'Untitled'}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{note.content.substring(0, 100)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400">{new Date(note.updatedAt).toLocaleDateString()}</span>
                  {note.tags?.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">{tag}</span>
                  ))}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
