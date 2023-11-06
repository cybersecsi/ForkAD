import { CSSProperties, useEffect, useState } from 'react';

interface ICountdownProps {
  date: Date;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const defaultCountdownState: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const Countdown = ({ date }: ICountdownProps) => {
  const [countdownState, setCountdownState] = useState<CountdownState>(defaultCountdownState);

  useEffect(() => {
    const calcCountdown = () => {
      const now = new Date();
      const countdownDate = new Date(date);
      const difference = +countdownDate - +now;

      const currentState: CountdownState = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      setCountdownState(currentState);
    };

    calcCountdown();
    const interval = setInterval(calcCountdown, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
      <div className='flex flex-col p-2 bg-slate-50 text-cPrimary rounded-box'>
        <span className='countdown font-mono text-5xl'>
          <span style={{ '--value': countdownState.days } as CSSProperties}></span>
        </span>
        days
      </div>
      <div className='flex flex-col p-2 bg-slate-50 text-cPrimary rounded-box'>
        <span className='countdown font-mono text-5xl'>
          <span style={{ '--value': countdownState.hours } as CSSProperties}></span>
        </span>
        hours
      </div>
      <div className='flex flex-col p-2 bg-slate-50 text-cPrimary rounded-box'>
        <span className='countdown font-mono text-5xl'>
          <span style={{ '--value': countdownState.minutes } as CSSProperties}></span>
        </span>
        min
      </div>
      <div className='flex flex-col p-2 bg-slate-50 text-cPrimary rounded-box'>
        <span className='countdown font-mono text-5xl'>
          <span style={{ '--value': countdownState.seconds } as CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  );
};
