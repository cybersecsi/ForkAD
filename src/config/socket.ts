import { ISocketConfig } from '@/types';

const HOST = import.meta.env.VITE_BACKEND ?? 'http://localhost';

export const SOCKET_CONFIG: ISocketConfig = {
  URL: HOST,
  GAME_NAMESPACE: `/game_events`,
  LIVE_NAMESPACE: `/live_events`,
};
