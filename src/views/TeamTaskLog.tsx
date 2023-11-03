import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { STATUS_CONFIG } from '@/config';
import { useCtf } from '@/context';
import { IAdminTeamTaskLog, ICtfTask, ICtfTeam } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminRESTManagerInstance } from '@/rest';
import { sleep } from '@/utils/helpers';
import { Legend, Loading } from '@/components';
import { numericRegex } from '@/utils/regex';

export const TeamTaskLog = () => {
  const { ctfTasks, ctfTeams } = useCtf();
  const [team, setTeam] = useState<ICtfTeam>();
  const [task, setTask] = useState<ICtfTask>();
  const [teamTaskLogs, setTeamTaskLogs] = useState<IAdminTeamTaskLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { teamId, taskId } = useParams();

  useEffect(() => {
    if (!teamId || !teamId.match(numericRegex) || !taskId || !taskId.match(numericRegex)) {
      toast.error('Error while loading team task log');
      navigate('/');
      throw new Error('Missing or wrong IDs');
    }
    const _team = ctfTeams.find((t: ICtfTeam) => t.id === parseInt(teamId));
    const _task = ctfTasks.find((t: ICtfTask) => t.id === parseInt(taskId));

    if (!_team || !_task) {
      toast.error('Error while loading team task log');
      navigate('/');
      throw new Error('Missing or wrong IDs');
    }

    setTeam(_team);
    setTask(_task);
    loadTeamTaskLogs(_team.id, _task.id);
  }, []);

  const loadTeamTaskLogs = async (teamId: number, taskId: number) => {
    try {
      const res = await AdminRESTManagerInstance.getTeamTaskLogs(teamId, taskId);
      setTeamTaskLogs(res.data);
      setIsLoading(false);
    } catch {
      toast.error('Error while loading team task log');
      await sleep(500);
      navigate('/');
    }
  };

  const getRoundsList = () => {
    const roundsList = [...new Set(teamTaskLogs.map((v: IAdminTeamTaskLog) => v.round))].sort(
      (a: number, b: number) => b - a,
    );
    return roundsList;
  };

  if (isLoading || !team || !task) {
    return <Loading blur={true} />;
  }

  return (
    <>
      <h1 className='text-cTertiary text-4xl mb-6'>
        Team <b>{team.name}</b> - Task <b>{task.name}</b>
      </h1>
      <Legend />
      <div className='overflow-x-auto'>
        <table className='table bg-cSecondary shadow-xl mt-6 text-md'>
          {/* head */}
          <thead className='text-cTertiary uppercase text-lg'>
            <tr>
              <th>Round</th>
              <th>Status</th>
              <th>Score</th>
              <th>Flags</th>
              <th>Checks</th>
              <th>Public Msg</th>
              <th>Private Msg</th>
              <th>Command</th>
            </tr>
          </thead>
          <tbody>
            {getRoundsList().map((round: number) => {
              const teamTaskLog = teamTaskLogs.find(
                (v: IAdminTeamTaskLog) => v.round === round,
              ) as IAdminTeamTaskLog;
              return (
                <tr
                  key={round}
                  className={`${STATUS_CONFIG[teamTaskLog.status].bg} text-slate-800`}
                >
                  <td>{round}</td>
                  <td>{teamTaskLog.status}</td>
                  <td>{teamTaskLog.score}</td>
                  <td>
                    +{teamTaskLog.stolen}/-{teamTaskLog.lost}
                  </td>
                  <td>
                    {teamTaskLog.checks_passed}/{teamTaskLog.checks}
                  </td>
                  <td>{teamTaskLog.public_message}</td>
                  <td>{teamTaskLog.private_message}</td>
                  <td>{teamTaskLog.command}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
