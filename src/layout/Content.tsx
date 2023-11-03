import { Sidebar } from '@/layout/Sidebar';
import { Footer } from '@/layout/Footer';
import { useUI } from '@/context';

export const Content: React.FC<React.BaseHTMLAttributes<HTMLDivElement>> = ({
  children,
}: React.BaseHTMLAttributes<HTMLDivElement>) => {
  const { sidebarOpen } = useUI();

  return (
    <main className='w-screen mt-20'>
      <Sidebar />
      <section
        className={`workspace min-h-full justify-between ${
          sidebarOpen ? 'workspace-base' : 'workspace-full'
        }`}
      >
        <section>{children}</section>
        <Footer />
      </section>
    </main>
  );
};
