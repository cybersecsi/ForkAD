import { IApiConfig } from '@/types';

export const API_CONFIG: IApiConfig = {
  BASE_API: `/api`,
  PUBLIC_ROUTES: {
    CONFIG: '/client/config/',
    TEAMS: '/client/teams/',
    TASKS: '/client/tasks/',
    LOGIN: '/admin/login/',
  },
  ADMIN_ROUTES: {
    STATUS: '/admin/status/',
    TEAMS: '/admin/teams/',
    TASKS: '/admin/tasks/',
  },
};
