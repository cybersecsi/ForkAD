import { Live } from '@/components';
import { useUI } from '@/context';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useUI();

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {sidebarOpen ? (
        <>
          <div className='flex flex-row justify-between align-center items-center pb-4'>
            <h2 className='text-cTertiary text-2xl font-semibold text-center uppercase'>
              Live Events
            </h2>
            <BsChevronLeft
              size={24}
              className='text-slate-200 hover:text-white cursor-pointer'
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <Live />
        </>
      ) : (
        <>
          <BsChevronRight
            size={24}
            className='text-slate-200 hover:text-white cursor-pointer'
            onClick={() => setSidebarOpen(true)}
          />
        </>
      )}
    </aside>
  );
};
