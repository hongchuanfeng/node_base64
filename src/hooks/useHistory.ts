'use client';

import { useState, useEffect, useCallback } from 'react';

export interface HistoryItem {
  id: string;
  type: 'encode' | 'decode';
  input: string;
  output: string;
  encoding: string;
  timestamp: number;
}

const MAX_HISTORY = 10;

interface UseHistoryReturn {
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  deleteHistoryItem: (id: string) => void;
}

export function useHistory(): UseHistoryReturn {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('base64-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const addHistory = useCallback((item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };

    setHistory(prev => {
      const updated = [newItem, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem('base64-history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('base64-history');
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('base64-history', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { history, addHistory, clearHistory, deleteHistoryItem };
}
