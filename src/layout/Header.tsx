import { VscSettings } from 'react-icons/vsc';
import { RiLoginBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { useCtf } from '@/context';
import { useEffect, useState } from 'react';

export const Header = () => {
  const { isAdmin, ctfState, ctfConfig } = useCtf();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const calcProgress = () => {
      const current = Math.floor(new Date().getTime() / 1000);
      const secondsPassed = current - ctfState.round_start - ctfConfig.round_time;
      const percentage = (secondsPassed * 100) / ctfConfig.round_time;
      setProgress(percentage);
    };

    calcProgress();
    const interval = setInterval(calcProgress, 1000);
    return () => clearInterval(interval);
  }, [ctfState, ctfConfig]);

  return (
    <header className='h-20 fixed flex w-full items-center bg-cPrimary shadow-2xl drop-shadow-2xl z-10'>
      <div className='w-full h-16 fixed px-6 mx-auto font-Jost flex flex-row justify-between items-center z-40 pr-4 gap-32'>
        <div className='flex justify-left items-center'>
          <div className='flex h-16 items-center gap-2'>
            <Link to='/' className='contents'>
              <Tippy content='A/D CTF'>
                <h1 className='logo text-cTertiary text-4xl'>ForkAD</h1>
              </Tippy>
            </Link>
          </div>
        </div>

        <progress
          className='progress progress-info bg-cSecondary w-full h-6'
          value={progress}
          max='100'
        ></progress>

        <div className='flex gap-4 items-center justify-center'>
          {isAdmin ? (
            <>
              {/* Username */}
              <Link to='/admin'>
                <Tippy content='Admin'>
                  <div className='flex justify-center p-2 items-center gap-4 border-gray-100 hover:bg-cSecondary rounded-md cursor-pointer transition-colors duration-200'>
                    <VscSettings size={24} className='text-slate-50' />
                    <span className='text-md font-bold text-slate-50'>Admin</span>
                  </div>
                </Tippy>
              </Link>
            </>
          ) : (
            <>
              {/* Username */}
              <Link to='/login'>
                <Tippy content='Login'>
                  <button className='flex justify-center p-2 items-center gap-4 border-gray-100 hover:bg-cSecondary rounded-md cursor-pointer transition-colors duration-200'>
                    <RiLoginBoxFill size={24} className='text-slate-50' />
                    <span className='text-md font-bold text-slate-50'>Login</span>
                  </button>
                </Tippy>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
