import { AxiosResponse } from 'axios';
import { cookieHttp } from '@/utils/axios';
import { API_CONFIG } from '@/config';
import { IAdminCtfTask, IAdminCtfTeam, IAdminTeamTaskLog } from '@/types';

class AdminRESTManager {
  async getStatus(): Promise<AxiosResponse> {
    const res = await cookieHttp().get(API_CONFIG.ADMIN_ROUTES.STATUS);
    return res;
  }

  async getTeam(teamId: number): Promise<AxiosResponse<IAdminCtfTeam>> {
    const res = await cookieHttp().get<IAdminCtfTeam>(`${API_CONFIG.ADMIN_ROUTES.TEAMS}${teamId}/`);
    return res;
  }

  async createTeam(data: Partial<IAdminCtfTeam>): Promise<AxiosResponse<IAdminCtfTeam>> {
    const res = await cookieHttp().post<IAdminCtfTeam>(`${API_CONFIG.ADMIN_ROUTES.TEAMS}`, data);
    return res;
  }

  async updateTeam(teamId: number, data: IAdminCtfTeam): Promise<AxiosResponse<IAdminCtfTeam>> {
    const res = await cookieHttp().put<IAdminCtfTeam>(
      `${API_CONFIG.ADMIN_ROUTES.TEAMS}${teamId}/`,
      data,
    );
    return res;
  }

  async getTask(taskId: number): Promise<AxiosResponse<IAdminCtfTask>> {
    const res = await cookieHttp().get<IAdminCtfTask>(`${API_CONFIG.ADMIN_ROUTES.TASKS}${taskId}/`);
    return res;
  }

  async createTask(data: Partial<IAdminCtfTask>): Promise<AxiosResponse<IAdminCtfTask>> {
    const res = await cookieHttp().post<IAdminCtfTask>(`${API_CONFIG.ADMIN_ROUTES.TASKS}`, data);
    return res;
  }

  async updateTask(taskId: number, data: IAdminCtfTask): Promise<AxiosResponse<IAdminCtfTask>> {
    const res = await cookieHttp().put<IAdminCtfTask>(
      `${API_CONFIG.ADMIN_ROUTES.TASKS}${taskId}/`,
      data,
    );
    return res;
  }

  async getTeamTaskLogs(
    teamId: number,
    taskId: number,
  ): Promise<AxiosResponse<IAdminTeamTaskLog[]>> {
    const res = await cookieHttp().get<IAdminTeamTaskLog[]>(
      `${API_CONFIG.ADMIN_ROUTES.TEAMTASKS}?team_id=${teamId}&task_id=${taskId}`,
    );
    return res;
  }
}

export const AdminRESTManagerInstance = new AdminRESTManager();
