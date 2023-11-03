import { FaGithub, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='mt-4'>
      <div className='w-full grid grid-cols-3 gap-4'>
        {/* Left links */}
        <div className='flex justify-center md:justify-start col-span-3 md:col-span-1'>
          <a
            className='ml-3 text-gray-500 hover:text-white'
            href='https://github.com/cybersecsi/ForkAD'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub size={24} />
          </a>
          <a
            className='ml-3 text-gray-500 hover:text-white '
            href='https://twitter.com/cybersecsi'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter size={24} />
          </a>
        </div>
        {/* SecSI credits */}
        <div className='text-center col-span-3 md:col-span-1'>
          A{' '}
          <a
            className='text-cTertiary hover:text-cQuaternary'
            href='https://secsi.io'
            target='_blank'
            rel='noreferrer'
          >
            SecSI
          </a>{' '}
          project
        </div>
        {/* Copyright */}
        <div className='text-center md:text-right col-span-3 md:col-span-1'>
          Thanks to{' '}
          <a
            className='text-cTertiary hover:text-cQuaternary'
            href='https://github.com/pomo-mondreganto/ForcAD'
            target='_blank'
            rel='noreferrer'
          >
            ForcAD
          </a>{' '}
          for the original infrastructure
        </div>
      </div>
    </footer>
  );
};
