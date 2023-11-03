import { AppRouter } from '@/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CtfProvider, UIProvider } from '@/context';

export const App = () => {
  return (
    <CtfProvider>
      <UIProvider>
        <RouterProvider router={AppRouter} />
        <Toaster position='bottom-left' />
      </UIProvider>
    </CtfProvider>
  );
};
