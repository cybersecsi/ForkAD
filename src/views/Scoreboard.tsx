import { Legend } from '@/components';
import { STATUS_CONFIG } from '@/config';
import { useCtf } from '@/context';
import { ICtfTask, ICtfTeam, ICtfTeamTask } from '@/types';
import { BsFlagFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const Scoreboard = () => {
  const { ctfState, ctfTasks, ctfTeams, isAdmin } = useCtf();

  const getTeamScore = (teamId: number) => {
    const currentTeamTasks = ctfState.team_tasks.filter(
      (task: ICtfTeamTask) => task.team_id === teamId,
    );
    const score = currentTeamTasks.reduce((prev: number, curr: ICtfTeamTask): number => {
      const slaPercentage = (curr.checks_passed * 100) / curr.checks;
      const taskPoints = (curr.score * slaPercentage) / 100;
      return taskPoints + prev;
    }, 0);
    return score;
  };

  return (
    <>
      <div className='text-center text-cTertiary font-semibold'>
        <h1 className='text-5xl uppercase'>Round</h1>
        <h1 className='text-9xl'>{ctfState.round}</h1>
      </div>
      <Legend />
      <div className='overflow-x-auto'>
        <table className='table bg-cSecondary shadow-xl mt-6 text-md'>
          {/* head */}
          <thead className='text-lg'>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Score</th>
              {ctfTasks
                .sort((taskA: ICtfTask, taskB: ICtfTask) => taskA.id - taskB.id)
                .map((task: ICtfTask, key: number) => {
                  return <th key={key}>{task.name}</th>;
                })}
            </tr>
          </thead>
          <tbody>
            {ctfTeams
              .sort((teamA: ICtfTeam, teamB: ICtfTeam) => {
                const scoreTeamA = getTeamScore(teamA.id);
                const scoreTeamB = getTeamScore(teamB.id);
                if (scoreTeamA !== scoreTeamB) {
                  return getTeamScore(teamB.id) - getTeamScore(teamA.id);
                } else {
                  return teamA.id - teamB.id;
                }
              })
              .map((team: ICtfTeam, key: number) => {
                return (
                  <tr key={key}>
                    <td>{team.id}</td>
                    <td>
                      <p>
                        <Link
                          className='underline hover:text-cTertiary transition-all duration-300'
                          to={`/team/${team.id}`}
                        >
                          {team.name}
                        </Link>
                      </p>
                      <p>{team.ip}</p>
                    </td>
                    <td>{getTeamScore(team.id).toFixed(2)}</td>
                    {ctfState.team_tasks
                      .filter((teamTask: ICtfTeamTask) => teamTask.team_id === team.id)
                      .sort(
                        (teamTaskA: ICtfTeamTask, teamTaskB: ICtfTeamTask) =>
                          teamTaskA.task_id - teamTaskB.task_id,
                      )
                      .map((teamTask: ICtfTeamTask, key: number) => {
                        return (
                          <td
                            key={key}
                            className={`${
                              STATUS_CONFIG[teamTask.status].bg
                            } text-slate-800 relative`}
                          >
                            {isAdmin && (
                              <Link
                                to={`/admin/team-task-log/team/${teamTask.team_id}/task/${teamTask.task_id}`}
                              >
                                <button className='absolute top-2 right-2 bg-cPrimary hover:bg-cSecondary transition-all duration-300 text-slate-50 rounded-md p-1'>
                                  Team Task Logs
                                </button>
                              </Link>
                            )}
                            <p>
                              <b>SLA:</b>{' '}
                              {((teamTask.checks_passed * 100) / teamTask.checks).toFixed(2)}%
                            </p>
                            <p>
                              <b>Service Points:</b> {teamTask.score.toFixed(2)}
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
