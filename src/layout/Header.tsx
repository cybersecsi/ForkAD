import { Link } from 'react-router-dom';
import { useCtf, useUI } from '@/context';
import { Progress } from '@/components';
import { VscSettings } from 'react-icons/vsc';
import { RiLoginBoxFill } from 'react-icons/ri';
import { HiDocumentText } from 'react-icons/hi';
import { PiListBold } from 'react-icons/pi';

export const Header = () => {
  const { isAdmin, ctfState, ctfConfig } = useCtf();
  const { setDrawerOpen, isLarge } = useUI();

  return (
    <header className='h-20 fixed flex w-full items-center bg-cPrimary shadow-2xl drop-shadow-2xl z-10'>
      <div className='w-full h-16 fixed px-6 mx-auto font-Jost flex flex-row justify-between items-center z-40 pr-4 gap-8 md:gap-16 xl:gap-32'>
        <div className='flex justify-left items-center'>
          <div className='flex h-16 items-center gap-2'>
            <Link to='/' className='contents'>
              <h1 className='logo text-cTertiary text-4xl'>ForkAD</h1>
            </Link>
          </div>
        </div>

        <Progress state={ctfState} config={ctfConfig} className='hidden md:block' />

        <div className='flex gap-4 items-center justify-center'>
          {/* Rules */}
          <Link to='/rules'>
            <div className='flex justify-center p-2 items-center gap-4 border-gray-100 hover:bg-cSecondary rounded-md cursor-pointer transition-colors duration-200'>
              <HiDocumentText size={24} className='text-slate-50' />
              <span className='hidden lg:block text-md font-bold text-slate-50'>Rules</span>
            </div>
          </Link>

          {isAdmin ? (
            <>
              {/* Admin */}
              <Link to='/admin'>
                <div className='flex justify-center p-2 items-center gap-4 border-gray-100 hover:bg-cSecondary rounded-md cursor-pointer transition-colors duration-200'>
                  <VscSettings size={24} className='text-slate-50' />
                  <span className='hidden lg:block text-md font-bold text-slate-50'>Admin</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              {/* Login */}
              <Link to='/login'>
                <button className='flex justify-center p-2 items-center gap-4 border-gray-100 hover:bg-cSecondary rounded-md cursor-pointer transition-colors duration-200'>
                  <RiLoginBoxFill size={24} className='text-slate-50' />
                  <span className='hidden lg:block text-md font-bold text-slate-50'>Login</span>
                </button>
              </Link>
            </>
          )}
          {/* Drawer for small devices */}
          {isLarge && (
            <button
              className='flex justify-center p-2 items-center gap-4 border-gray-100 hover:bg-cSecondary rounded-md cursor-pointer transition-colors duration-200'
              onClick={() => setDrawerOpen(true)}
            >
              <PiListBold size={24} className='text-slate-50' />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
