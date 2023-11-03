import { AxiosResponse } from 'axios';
import { http } from '@/utils/axios';
import { ICtfConfig, ICtfTask, ICtfTeam, ILoginReq } from '@/types';
import { API_CONFIG } from '@/config';
import { IFullCtfTeamTask } from '@/types';

class PublicRESTManager {
  async getConfig(): Promise<AxiosResponse<ICtfConfig>> {
    const res = await http.get<ICtfConfig>(API_CONFIG.PUBLIC_ROUTES.CONFIG);
    return res;
  }

  async getTeams(): Promise<AxiosResponse<ICtfTeam[]>> {
    const res = await http.get<ICtfTeam[]>(API_CONFIG.PUBLIC_ROUTES.TEAMS);
    return res;
  }

  async getTeam(teamId: number): Promise<AxiosResponse<IFullCtfTeamTask[]>> {
    const res = await http.get<IFullCtfTeamTask[]>(`${API_CONFIG.PUBLIC_ROUTES.TEAMS}${teamId}/`);
    return res;
  }

  async getTasks(): Promise<AxiosResponse<ICtfTask[]>> {
    const res = await http.get<ICtfTask[]>(API_CONFIG.PUBLIC_ROUTES.TASKS);
    return res;
  }

  async getTask(taskId: number): Promise<AxiosResponse<ICtfTask>> {
    const res = await http.get<ICtfTask>(`${API_CONFIG.PUBLIC_ROUTES.TASKS}${taskId}`);
    return res;
  }

  async login(data: ILoginReq): Promise<AxiosResponse> {
    const res = await http.post(API_CONFIG.PUBLIC_ROUTES.LOGIN, data);
    return res;
  }
}

export const PublicRESTManagerInstance = new PublicRESTManager();
