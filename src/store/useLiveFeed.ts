import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ActivityEvent } from '../types';

interface LiveFeedState {
  events: ActivityEvent[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  filters: {
    eventTypes: ActivityEvent['type'][];
    clans: string[];
    timeRange: '1h' | '24h' | '7d' | 'all';
  };
}

interface LiveFeedActions {
  addEvent: (event: ActivityEvent) => void;
  addEvents: (events: ActivityEvent[]) => void;
  setEvents: (events: ActivityEvent[]) => void;
  setConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: Partial<LiveFeedState['filters']>) => void;
  clearEvents: () => void;
  reset: () => void;
}

type LiveFeedStore = LiveFeedState & LiveFeedActions;

const MAX_EVENTS = 500; // Keep memory usage reasonable

const initialState: LiveFeedState = {
  events: [],
  isConnected: false,
  isLoading: false,
  error: null,
  filters: {
    eventTypes: [],
    clans: [],
    timeRange: '24h'
  }
};

export const useLiveFeedStore = create<LiveFeedStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      addEvent: (event) => {
        const { events } = get();
        const newEvents = [event, ...events].slice(0, MAX_EVENTS);
        console.log('📊 LiveFeedStore: Adding event:', event.type, event);
        set({ events: newEvents }, false, 'addEvent');
      },

      addEvents: (newEvents) => {
        const { events } = get();
        const combinedEvents = [...newEvents, ...events]
          .sort((a, b) => b.at - a.at)
          .slice(0, MAX_EVENTS);
        console.log('📊 LiveFeedStore: Adding events:', newEvents.length);
        set({ events: combinedEvents }, false, 'addEvents');
      },

      setEvents: (events) => {
        const sortedEvents = [...events]
          .sort((a, b) => b.at - a.at)
          .slice(0, MAX_EVENTS);
        console.log('📊 LiveFeedStore: Setting events:', events.length);
        set({ events: sortedEvents, error: null }, false, 'setEvents');
      },

      setConnected: (isConnected) => {
        console.log('🔌 LiveFeedStore: Connection status:', isConnected);
        set({ isConnected }, false, 'setConnected');
      },

      setLoading: (isLoading) => {
        set({ isLoading }, false, 'setLoading');
      },

      setError: (error) => {
        console.log('❌ LiveFeedStore: Setting error:', error);
        set({ error, isLoading: false }, false, 'setError');
      },

      setFilters: (newFilters) => {
        const { filters } = get();
        const updatedFilters = { ...filters, ...newFilters };
        console.log('🔍 LiveFeedStore: Updating filters:', newFilters);
        set({ filters: updatedFilters }, false, 'setFilters');
      },

      clearEvents: () => {
        console.log('🗑️ LiveFeedStore: Clearing events');
        set({ events: [] }, false, 'clearEvents');
      },

      reset: () => {
        console.log('🔄 LiveFeedStore: Resetting state');
        set(initialState, false, 'reset');
      }
    }),
    {
      name: 'live-feed-store'
    }
  )
);
