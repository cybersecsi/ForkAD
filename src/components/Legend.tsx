import { STATUS_CONFIG } from '@/config';

export const Legend = () => {
  return (
    <div className='flex flex-col md:flex-row gap-4'>
      {Object.values(STATUS_CONFIG).map((value: { name: string; bg: string }, key: number) => {
        return (
          <div className={`${value.bg} rounded-md p-3 text-slate-800`} key={key}>
            {value.name}
          </div>
        );
      })}
    </div>
  );
};
