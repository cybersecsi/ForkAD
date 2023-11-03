import { Sidebar } from '@/layout/Sidebar';
import { Footer } from '@/layout/Footer';

export const Content: React.FC<React.BaseHTMLAttributes<HTMLDivElement>> = ({
  children,
}: React.BaseHTMLAttributes<HTMLDivElement>) => {
  return (
    <main className='w-screen mt-20'>
      <Sidebar />
      <section className='workspace min-h-full justify-between'>
        <section>{children}</section>
        <Footer />
      </section>
    </main>
  );
};
