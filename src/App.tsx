import { AppRouter } from '@/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CtfProvider } from '@/context';

export const App = () => {
  return (
    <CtfProvider>
      <RouterProvider router={AppRouter} />
      <Toaster position='bottom-left' />
    </CtfProvider>
  );
};
