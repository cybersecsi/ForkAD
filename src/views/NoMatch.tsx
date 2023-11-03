import { Link } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <div className='content'>
      <div className='inset-0 text-center flex flex-col justify-center p-8'>
        <div>
          <h5 className='text-cyan-600 font-bold'>404 Error</h5>
          <h3 className='text-cTertiary text-5xl font-bold py-4'>Page not found.</h3>
          <h4>Check the URL in the address bar or go back to the homepage.</h4>
          <Link to={'/'}>
            <button className='text-white rounded bg-cyan-600 p-3 mt-4 hover:bg-cyan-800'>
              Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
