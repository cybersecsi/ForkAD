export interface ICtfConfig {
  id: number;
  flag_lifetime: number;
  game_hardness: number;
  game_running: boolean;
  inflation: boolean;
  mode: string;
  real_round: number;
  round_time: number;
  start_time: string;
  timezone: string;
  volga_attacks_mode: boolean;
}

export interface ICtfTeamTask {
  task_id: number;
  team_id: number;
  status: number;
  stolen: number;
  lost: number;
  score: number;
  checks: number;
  checks_passed: number;
  message: string;
}

export interface ICtfTeam {
  id: number;
  name: string;
  ip: string;
  highlighted: boolean;
  active: boolean;
}

export interface ICtfTask {
  id: number;
  name: string;
}

export interface ICtfScoreboardState {
  round: number;
  round_start: number;
  team_tasks: ICtfTeamTask[];
}

export interface ICtfScoreboard {
  state: ICtfScoreboardState;
  teams: ICtfTeam[];
  tasks: ICtfTask[];
  config: ICtfConfig;
}

export interface IFullCtfTeamTask extends ICtfTeamTask {
  timestamp: string;
  round: string;
}

export interface ICtfFlagStolen {
  attacker_delta: number;
  attacker_id: number;
  task_id: number;
  victim_id: number;
}

export interface IAdminCtfTeam extends ICtfTeam {
  token: string;
}

export interface IAdminCtfTask {
  id: number;
  name: string;
  active: boolean;
  checker: string;
  checker_timeout: number;
  checker_type: string;
  default_score: number;
  env_path: string;
  get_period: number;
  gets: number;
  puts: number;
  places: number;
}
