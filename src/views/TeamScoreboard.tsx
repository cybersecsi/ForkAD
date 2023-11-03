import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsFlagFill } from 'react-icons/bs';
import { STATUS_CONFIG } from '@/config';
import { useCtf } from '@/context';
import { ICtfTask, ICtfTeam, ICtfTeamTask } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';
import { PublicRESTManagerInstance } from '@/rest';
import { rangeWithoutZero, sleep } from '@/utils/helpers';
import { Legend, Loading } from '@/components';
import { IFullCtfTeamTask } from '@/types/IForcad';
import { numericRegex } from '@/utils/regex';

export const TeamScoreboard = () => {
  const { ctfTasks, ctfTeams, ctfState } = useCtf();
  const [team, setTeam] = useState<ICtfTeam>();
  const [teamTasks, setTeamTasks] = useState<IFullCtfTeamTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { teamId } = useParams();

  useEffect(() => {
    if (!teamId || !teamId.match(numericRegex)) {
      toast.error('Error while loading team');
      navigate('/');
      throw new Error('Missing or wrong Team ID');
    }
    const t = ctfTeams.find((t: ICtfTeam) => t.id === parseInt(teamId));

    if (!t) {
      toast.error('Error while loading team');
      navigate('/');
      throw new Error('Missing or wrong Team ID');
    }

    setTeam(t);
    loadTeam(parseInt(teamId));
  }, []);

  const loadTeam = async (teamId: number) => {
    try {
      const res = await PublicRESTManagerInstance.getTeam(teamId);
      setTeamTasks(res.data);
      setIsLoading(false);
    } catch {
      toast.error('Error while loading team');
      await sleep(500);
      navigate('/');
    }
  };

  const getRoundScore = (round: number) => {
    const currentTeamTasks = teamTasks.filter(
      (task: IFullCtfTeamTask) => task.round === round.toString(),
    );
    console.log(currentTeamTasks);
    const score = currentTeamTasks.reduce((prev: number, curr: ICtfTeamTask): number => {
      const slaPercentage = (curr.checks_passed * 100) / curr.checks;
      const taskPoints = (curr.score * slaPercentage) / 100;
      return taskPoints + prev;
    }, 0);
    console.log(score);
    return score;
  };

  if (isLoading || !team) {
    return <Loading blur={true} />;
  }

  return (
    <>
      <h1 className='text-center text-cTertiary text-4xl mb-6'>
        Team <b>{team.name}</b> - IP Address <b>{team.ip}</b>
      </h1>
      <Legend />
      <div className='overflow-x-auto'>
        <table className='table bg-cSecondary shadow-xl mt-6 text-md'>
          {/* head */}
          <thead className='text-cTertiary uppercase text-lg'>
            <tr>
              <th>Round</th>
              <th>Score</th>
              {ctfTasks
                .sort((taskA: ICtfTask, taskB: ICtfTask) => taskA.id - taskB.id)
                .map((task: ICtfTask, key: number) => {
                  return <th key={key}>{task.name}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {rangeWithoutZero(ctfState.round)
              .sort((a: number, b: number) => b - a)
              .map((round: number) => {
                return (
                  <tr key={round}>
                    <td>{round}</td>
                    <td>{getRoundScore(round).toFixed(2)}</td>
                    {Object.values(teamTasks)
                      .filter((teamTask: IFullCtfTeamTask) => teamTask.round === round.toString())
                      .map((teamTask: IFullCtfTeamTask, key: number) => {
                        return (
                          <td
                            key={key}
                            className={`${STATUS_CONFIG[teamTask.status].bg} text-slate-800`}
                          >
                            <p>
                              <b>SLA:</b>{' '}
                              {((teamTask.checks_passed * 100) / teamTask.checks).toFixed(2)}%
                            </p>
                            <p>
                              <b>Service Points:</b> {teamTask.score}
                            </p>
                            <p>
                              <BsFlagFill className='inline' /> +{teamTask.stolen}/-{teamTask.lost}
                            </p>
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
