import { ISocketConfig } from '@/types';
import { io } from 'socket.io-client';

const HOST = import.meta.env.VITE_BACKEND ?? '';

const SOCKET_CONFIG: ISocketConfig = {
  URL: HOST,
  GAME_NAMESPACE: `/game_events`,
  LIVE_NAMESPACE: `/live_events`,
};

export const gameSocket = io(`${SOCKET_CONFIG.URL}${SOCKET_CONFIG.GAME_NAMESPACE}`);
export const liveSocket = io(`${SOCKET_CONFIG.URL}${SOCKET_CONFIG.LIVE_NAMESPACE}`);
