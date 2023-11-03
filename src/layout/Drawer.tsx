import { Live, Progress } from '@/components';
import { useCtf, useUI } from '@/context';
import { useClickAway } from '@uidotdev/usehooks';

export const Drawer = () => {
  const { ctfState, ctfConfig } = useCtf();
  const { drawerOpen, setDrawerOpen } = useUI();
  const ref = useClickAway(() => {
    setDrawerOpen(false);
  });

  return (
    <>
      {drawerOpen && (
        <>
          <div className='overlay'></div>
          <div className='custom-drawer' ref={ref as React.LegacyRef<HTMLDivElement>}>
            <div className='flex flex-col p-4 items-center justify-center gap-6'>
              <h1 className='text-cTertiary text-4xl uppercase font-semibold'>Progress</h1>
              <Progress state={ctfState} config={ctfConfig} />
              <h1 className='text-cTertiary text-4xl uppercase font-semibold'>Live Events</h1>
              <Live />
            </div>
          </div>
        </>
      )}
    </>
  );
};
