import { createContext, useContext, useEffect, useState } from 'react';
import { AdminRESTManagerInstance, PublicRESTManagerInstance } from '@/rest';
import { io, Socket } from 'socket.io-client';
import {
  ICtfConfig,
  ICtfFlagStolen,
  ICtfScoreboard,
  ICtfScoreboardState,
  ICtfTask,
  ICtfTeam,
} from '@/types';
import { SOCKET_CONFIG } from '@/config';
import { areObjectEquals } from '@/utils/helpers';

interface ProviderInterface {
  // REST related stuff
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
  ctfConfig: ICtfConfig;
  getConfig: () => Promise<void>;
  // Socket related stuff
  gameSocket: Socket;
  liveSocket: Socket;
  isGameSocketConnected: boolean;
  isLiveSocketConnected: boolean;
  // CTF related stuff
  ctfState: ICtfScoreboardState;
  ctfTeams: ICtfTeam[];
  ctfTasks: ICtfTask[];
  liveEvents: ICtfFlagStolen[];
  // Global stuff
  isCtfLoading: boolean;
}

const defaultCtfState: ICtfScoreboardState = {
  round: 0,
  round_start: 0,
  team_tasks: [],
};

const defaultCtfConfig: ICtfConfig = {
  id: 1,
  flag_lifetime: 5,
  game_hardness: 10,
  inflation: true,
  volga_attacks_mode: false,
  round_time: 20,
  mode: 'classic',
  timezone: '',
  start_time: '',
  real_round: 0,
  game_running: false,
};

const CtfContext = createContext<ProviderInterface | null>(null);

const CtfProvider = ({ children }: any): any => {
  const [isCtfLoading, setIsCtfLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const gameSocket = io(`${SOCKET_CONFIG.URL}${SOCKET_CONFIG.GAME_NAMESPACE}`);
  const liveSocket = io(`${SOCKET_CONFIG.URL}${SOCKET_CONFIG.LIVE_NAMESPACE}`);
  const [isGameSocketConnected, setIsGameSocketConnected] = useState<boolean>(gameSocket.connected);
  const [isLiveSocketConnected, setIsLiveSocketConnected] = useState<boolean>(liveSocket.connected);
  const [ctfConfig, setCtfConfig] = useState<ICtfConfig>(defaultCtfConfig);
  const [ctfState, setCtfState] = useState<ICtfScoreboardState>(defaultCtfState);
  const [ctfTeams, setCtfTeams] = useState<ICtfTeam[]>([]);
  const [ctfTasks, setCtfTasks] = useState<ICtfTask[]>([]);
  const [liveEvents, setLiveEvents] = useState<ICtfFlagStolen[]>([]);

  useEffect(() => {
    const isConfigSet = !areObjectEquals(ctfConfig, defaultCtfConfig);
    const isStateSet = !areObjectEquals(ctfState, defaultCtfState);
    const isTeamsSet = ctfTeams.length > 0;
    const isTasksSet = ctfTasks.length > 0;

    const valuesToCheck = [isConfigSet, isStateSet, isTeamsSet, isTasksSet];
    const ctfReady = valuesToCheck.every((value: boolean) => value);
    setIsCtfLoading(!ctfReady);
  }, [ctfConfig, ctfState, ctfTeams, ctfTasks]);

  const checkUser = async () => {
    try {
      await AdminRESTManagerInstance.getStatus();
      setIsAdmin(true);
    } catch {
      setIsAdmin(false);
    }
  };

  const getConfig = async () => {
    const res = await PublicRESTManagerInstance.getConfig();
    setCtfConfig(res.data);
  };

  const onConnect = (socketName: 'game' | 'live') => {
    socketName === 'game' ? setIsGameSocketConnected(true) : setIsLiveSocketConnected(true);
  };

  const onDisconnect = (socketName: 'game' | 'live') => {
    socketName === 'game' ? setIsGameSocketConnected(false) : setIsLiveSocketConnected(false);
  };

  const onInitScoreboard = (value: { data: ICtfScoreboard }) => {
    setCtfState(value.data.state);
    setCtfTeams(value.data.teams);
    setCtfTasks(value.data.tasks);
  };

  const onUpdateScoreboard = (value: { data: ICtfScoreboardState }) => {
    setCtfState(value.data);
  };

  const onFlagStolen = (value: { data: ICtfFlagStolen }) => {
    setLiveEvents((old: ICtfFlagStolen[]) => [value.data, ...old]);
  };

  useEffect(() => {
    // Check user status
    checkUser();
    // Get Config from API
    getConfig();

    // Setup Socket.io
    gameSocket.on('connect', () => onConnect('game'));
    gameSocket.on('disconnect', () => onDisconnect('game'));
    gameSocket.on('init_scoreboard', onInitScoreboard);
    gameSocket.on('update_scoreboard', onUpdateScoreboard);
    liveSocket.on('connect', () => onConnect('live'));
    liveSocket.on('disconnect', () => onDisconnect('live'));
    liveSocket.on('flag_stolen', onFlagStolen);

    return () => {
      gameSocket.off('connect', () => onConnect('game'));
      gameSocket.off('disconnect', () => onDisconnect('game'));
      liveSocket.off('connect', () => onConnect('live'));
      liveSocket.off('disconnect', () => onDisconnect('live'));
    };
  }, []);

  return (
    <CtfContext.Provider
      value={{
        isCtfLoading: isCtfLoading,
        isAdmin: isAdmin,
        refreshUser: checkUser,
        ctfConfig: ctfConfig,
        getConfig: getConfig,
        gameSocket: gameSocket,
        isGameSocketConnected: isGameSocketConnected,
        liveSocket: liveSocket,
        isLiveSocketConnected: isLiveSocketConnected,
        ctfState: ctfState,
        ctfTeams: ctfTeams,
        ctfTasks: ctfTasks,
        liveEvents: liveEvents,
      }}
    >
      {children}
    </CtfContext.Provider>
  );
};

const useCtf = () => {
  const context = useContext(CtfContext);
  if (!context) {
    throw new Error('useCtf must be used within CtfProvider');
  }
  return context;
};

export { CtfProvider, useCtf };
