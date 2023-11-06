import { BsEmojiFrownFill } from 'react-icons/bs';
import { Countdown } from '@/components';
import { useCtf } from '@/context';

export const NotStarted = () => {
  const { ctfConfig } = useCtf();

  return (
    <div className='m-auto'>
      <div className='inset-0 text-center flex flex-col justify-center p-8'>
        <div className='flex flex-col items-center'>
          <BsEmojiFrownFill size={92} className='text-cTertiary' />
          <h3 className='text-cTertiary text-5xl font-bold py-4'>The CTF is not started yet.</h3>
          <Countdown date={new Date(ctfConfig.start_time)} />
        </div>
      </div>
    </div>
  );
};
