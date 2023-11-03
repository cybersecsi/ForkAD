import { useEffect, useState } from 'react';
import { ICtfConfig, ICtfScoreboardState } from '@/types';

interface IProgressProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  state: ICtfScoreboardState;
  config: ICtfConfig;
}

export const Progress = ({ state, config, className }: IProgressProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const calcProgress = () => {
      const current = Math.floor(new Date().getTime() / 1000);
      const secondsPassed = current - state.round_start - config.round_time;
      const percentage = (secondsPassed * 100) / config.round_time;
      setProgress(percentage);
    };

    calcProgress();
    const interval = setInterval(calcProgress, 1000);
    return () => clearInterval(interval);
  }, [state, config]);

  return (
    <>
      <progress
        className={`progress progress-info bg-cSecondary w-full h-6 ${className}`}
        value={progress}
        max='100'
      ></progress>
    </>
  );
};
