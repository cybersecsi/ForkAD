import { useCtf } from '@/context';
import { ICtfFlagStolen, ICtfTask, ICtfTeam } from '@/types';
import { BiTargetLock } from 'react-icons/bi';

export const Live = () => {
  const { liveEvents, ctfTeams, ctfTasks } = useCtf();

  return (
    <>
      <div className='alert alert-warning'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
        <span>
          Live Events will be shown here. If you reload the page all the events will be deleted!
        </span>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {liveEvents.map((liveEvent: ICtfFlagStolen, key: number) => {
          const attacker = ctfTeams.find(
            (team: ICtfTeam) => team.id === liveEvent.attacker_id,
          ) as ICtfTeam;
          const victim = ctfTeams.find(
            (team: ICtfTeam) => team.id === liveEvent.victim_id,
          ) as ICtfTeam;
          const task = ctfTasks.find((task: ICtfTask) => task.id === liveEvent.task_id) as ICtfTask;
          const points = liveEvent.attacker_delta.toFixed(2);
          return (
            <div
              className='flex flex-col gap-2 text-center items-center bg-cPrimary p-2 rounded-md'
              key={key}
            >
              <BiTargetLock size={48} className='text-cTertiary' />
              <p>
                <b>Team {attacker.name}</b> stole a flag from <b>Team {victim.name}</b> on service{' '}
                <b>{task.name}</b>. <br />
              </p>
              <div className='bg-emerald-500 p-2 rounded-md mt-2 text-white font-bold'>
                +{points} points
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
