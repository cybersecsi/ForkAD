import { useCtf } from '@/context';
import { ICtfTask, ICtfTeam } from '@/types';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';
import { MdEdit } from 'react-icons/md';

export const Admin = () => {
  const { ctfTeams, ctfTasks } = useCtf();

  return (
    <>
      {/* Teams */}
      <div>
        <div className='flex justify-between'>
          <h1 className='text-cTertiary font-semibold text-4xl'>Teams</h1>
          <Link to='/admin/create-team'>
            <button className='flex justify-center p-2 items-center gap-4 border-gray-100 bg-cTertiary hover:bg-cQuaternary rounded-md cursor-pointer transition-colors duration-200'>
              <GrAdd size={24} className='text-cPrimary' />
              <span className='text-md font-bold text-cPrimary'>Add Team</span>
            </button>
          </Link>
        </div>
        <div className='grid grid-cols-6 gap-4 mt-4'>
          {ctfTeams.map((team: ICtfTeam, key: number) => {
            return (
              <div
                className='flex flex-col gap-2 items-center bg-cSecondary rounded-md shadow-2xl drop-shadow-2xl text-slate-50 p-3 text-center'
                key={key}
              >
                <h2 className='text-xl font-semibold'>{team.name}</h2>
                <h3 className='text-md'>{team.ip}</h3>
                <Link to={`/admin/team/${team.id}`}>
                  <button className='flex justify-center my-2 p-2 items-center gap-4 border-gray-100 bg-cTertiary hover:bg-cQuaternary rounded-md cursor-pointer transition-colors duration-200'>
                    <MdEdit size={24} className='text-cPrimary' />
                    <span className='text-md font-bold text-cPrimary'>Edit Team</span>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {/* Tasks */}
      <div className='mt-8'>
        <div className='flex justify-between'>
          <h1 className='text-cTertiary font-semibold text-4xl'>Tasks</h1>
          <Link to='/admin/create-task'>
            <button className='flex justify-center p-2 items-center gap-4 border-gray-100 bg-cTertiary hover:bg-cQuaternary rounded-md cursor-pointer transition-colors duration-200'>
              <GrAdd size={24} className='text-cPrimary' />
              <span className='text-md font-bold text-cPrimary'>Add Task</span>
            </button>
          </Link>
        </div>
        <div className='grid grid-cols-6 gap-4 mt-4'>
          {ctfTasks.map((task: ICtfTask, key: number) => {
            return (
              <div
                className='flex flex-col gap-2 items-center bg-cSecondary rounded-md shadow-2xl drop-shadow-2xl text-slate-50 p-3 text-center'
                key={key}
              >
                <h2 className='text-xl font-semibold'>{task.name}</h2>
                <Link to={`/admin/task/${task.id}`}>
                  <button className='flex justify-center my-2 p-2 items-center gap-4 border-gray-100 bg-cTertiary hover:bg-cQuaternary rounded-md cursor-pointer transition-colors duration-200'>
                    <MdEdit size={24} className='text-cPrimary' />
                    <span className='text-md font-bold text-cPrimary'>Edit Task</span>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
