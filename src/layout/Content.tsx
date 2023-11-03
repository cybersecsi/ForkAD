import { Sidebar } from '@/layout/Sidebar';

export const Content: React.FC<React.BaseHTMLAttributes<HTMLDivElement>> = ({
  children,
}: React.BaseHTMLAttributes<HTMLDivElement>) => {
  return (
    <main className='w-screen mt-20'>
      <Sidebar />
      <section className='workspace'>{children}</section>
    </main>
  );
};
