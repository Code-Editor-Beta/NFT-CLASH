import type { ActivityEvent } from '../types';
import { generateMockActivity } from './seed';

type WebSocketEventType = 'connection' | 'activity' | 'clan_update' | 'user_update';

interface MockWebSocketEvent {
  type: WebSocketEventType;
  data: any;
  timestamp: number;
}

type SocketListener = (event: MockWebSocketEvent) => void;

class MockWebSocket {
  private listeners: Map<WebSocketEventType, SocketListener[]> = new Map();
  private connected = false;
  private eventInterval?: NodeJS.Timeout;
  private connectionInterval?: NodeJS.Timeout;

  constructor() {
    console.log('🔌 MockWebSocket: Initializing...');
  }

  connect(): Promise<void> {
    return new Promise((resolve) => {
      console.log('🔌 MockWebSocket: Connecting...');
      
      // Simulate connection delay
      this.connectionInterval = setTimeout(() => {
        this.connected = true;
        console.log('✅ MockWebSocket: Connected!');
        
        this.emit('connection', { status: 'connected', timestamp: Date.now() });
        this.startEventSimulation();
        resolve();
      }, 500 + Math.random() * 1000);
    });
  }

  disconnect(): void {
    console.log('🔌 MockWebSocket: Disconnecting...');
    this.connected = false;
    
    if (this.eventInterval) {
      clearInterval(this.eventInterval);
    }
    
    if (this.connectionInterval) {
      clearTimeout(this.connectionInterval);
    }
    
    this.listeners.clear();
  }

  on(eventType: WebSocketEventType, listener: SocketListener): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(listener);
    console.log(`📡 MockWebSocket: Registered listener for ${eventType}`);
  }

  off(eventType: WebSocketEventType, listener: SocketListener): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
        console.log(`📡 MockWebSocket: Removed listener for ${eventType}`);
      }
    }
  }

  private emit(eventType: WebSocketEventType, data: any): void {
    if (!this.connected) return;

    const event: MockWebSocketEvent = {
      type: eventType,
      data,
      timestamp: Date.now()
    };

    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.error(`🚨 MockWebSocket: Error in ${eventType} listener:`, error);
        }
      });
    }
  }

  private startEventSimulation(): void {
    if (!this.connected) return;

    console.log('🎲 MockWebSocket: Starting event simulation...');

    // Generate periodic activity events
    this.eventInterval = setInterval(() => {
      if (!this.connected) return;

      // Generate 1-3 random activity events
      const eventCount = Math.floor(Math.random() * 3) + 1;
      const newEvents = generateMockActivity(eventCount);

      newEvents.forEach(event => {
        this.emit('activity', event);
        console.log(`📊 MockWebSocket: Broadcasting ${event.type} event:`, event);
      });

      // Occasionally emit clan updates
      if (Math.random() > 0.7) {
        const clanIds = [
          'cyber-dragons', 'neon-ninjas', 'quantum-wolves', 'cosmic-cats', 
          'plasma-phoenixes', 'void-vikings', 'crystal-bears', 'shadow-serpents'
        ];
        const randomClan = clanIds[Math.floor(Math.random() * clanIds.length)];
        
        this.emit('clan_update', {
          clanId: randomClan,
          field: 'members',
          change: Math.floor(Math.random() * 10) - 5, // -5 to +5
          timestamp: Date.now()
        });
        console.log(`🏰 MockWebSocket: Broadcasting clan update for ${randomClan}`);
      }

      // Occasionally emit user updates (for current user)
      if (Math.random() > 0.9) {
        this.emit('user_update', {
          userId: 'user-1',
          field: 'xp',
          change: Math.floor(Math.random() * 100) + 10,
          timestamp: Date.now()
        });
        console.log('👤 MockWebSocket: Broadcasting user XP update');
      }

    }, 3000 + Math.random() * 7000); // Every 3-10 seconds
  }

  // Simulate manual event triggers (for admin panel)
  triggerEvent(eventType: WebSocketEventType, data: any): void {
    console.log(`🎭 MockWebSocket: Manually triggering ${eventType} event:`, data);
    this.emit(eventType, data);
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// Singleton instance
export const mockWebSocket = new MockWebSocket();

// Hook for React components
export const useMockWebSocket = () => {
  const connect = () => mockWebSocket.connect();
  const disconnect = () => mockWebSocket.disconnect();
  const on = (eventType: WebSocketEventType, listener: SocketListener) => 
    mockWebSocket.on(eventType, listener);
  const off = (eventType: WebSocketEventType, listener: SocketListener) => 
    mockWebSocket.off(eventType, listener);
  const isConnected = () => mockWebSocket.isConnected();
  const triggerEvent = (eventType: WebSocketEventType, data: any) => 
    mockWebSocket.triggerEvent(eventType, data);

  return {
    connect,
    disconnect,
    on,
    off,
    isConnected,
    triggerEvent
  };
};

export type { WebSocketEventType, MockWebSocketEvent, SocketListener };
