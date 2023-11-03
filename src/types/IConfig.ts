export enum CookieName {
  sessionToken = 'session',
}

export interface IApiConfig {
  BASE_API: string;
  PUBLIC_ROUTES: {
    CONFIG: string;
    TEAMS: string;
    TASKS: string;
    LOGIN: string;
  };
  ADMIN_ROUTES: {
    STATUS: string;
    TEAMS: string;
    TASKS: string;
  };
}

export interface ISocketConfig {
  URL: string;
  GAME_NAMESPACE: string;
  LIVE_NAMESPACE: string;
}

export interface IStatuses {
  [id: number]: {
    name: string;
    bg: string;
  };
}
