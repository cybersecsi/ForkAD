import { AppRouter } from '@/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CtfProvider } from '@/context';
import { CookiesProvider } from 'react-cookie';
import 'tippy.js/dist/tippy.css'; // optional
import 'animate.css';

export const App = () => {
  return (
    <CtfProvider>
      <CookiesProvider>
        <RouterProvider router={AppRouter} />
        <Toaster position='bottom-left' />
      </CookiesProvider>
    </CtfProvider>
  );
};
