import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const OptionalRules = () => {
  const [md, setMd] = useState<string>('');

  const loadOptionalRules = async () => {
    try {
      const file = await import('@/assets/rules/rules.md');
      const response = await fetch(file.default);
      const _md = await response.text();
      setMd(_md);
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    loadOptionalRules();
  }, []);

  return (
    <ReactMarkdown
      className='markdown-content'
      remarkPlugins={[gfm]}
      components={{
        h1({ children }) {
          return <h1 className='text-cTertiary font-semibold text-4xl mt-6'>{children}</h1>;
        },
        h2({ children }) {
          return <h2 className='text-cTertiary text-3xl mt-6'>{children}</h2>;
        },
        h3({ children }) {
          return <h2 className='text-cTertiary text-2xl mt-6'>{children}</h2>;
        },
        h4({ children }) {
          return <h2 className='text-cTertiary text-xl mt-6'>{children}</h2>;
        },
        table({ children }) {
          console.log();
          return (
            <table className='table w-auto bg-cSecondary shadow-xl mt-6 text-md mb-6'>
              {children}
            </table>
          );
        },
      }}
    >
      {md}
    </ReactMarkdown>
  );
};

export const Rules = () => {
  return (
    <>
      <h1 className='text-cTertiary font-semibold text-4xl mb-6'>Rules</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='text-emerald-400 flex flex-col gap-2 items-center bg-cSecondary rounded-md shadow-2xl drop-shadow-2xl p-3'>
          <h3 className='uppercase text-2xl font-semibold'>Teams are allowed to</h3>
          <ul className='list-disc list-inside w-full'>
            <li>Do whatever they want within their vulnbox.</li>
            <li>
              Most likely, the team would like to patch vulnerabilities in their services or block
              exploitation of vulnerabilities.
            </li>
            <li>Attack other teams.</li>
          </ul>
        </div>
        <div className='text-rose-400 flex flex-col gap-2 items-center bg-cSecondary rounded-md shadow-2xl drop-shadow-2xl p-3'>
          <h3 className='uppercase text-2xl font-semibold'>Teams are prohibited to</h3>
          <ul className='list-disc list-inside w-full'>
            <li>Attack the game infrastructure operated by organizers.</li>
            <li>
              Generate excessive amounts of traffic that pose a threat to network stability of any
              other team.
            </li>
          </ul>
        </div>
      </div>
      <h2 className='text-cTertiary text-3xl mt-6'>Submit a Flag</h2>
      <div className='mt-2 bg-cSecondary text-slate-200 shadow-2xl drop-shadow-2xl p-3 rounded-md'>
        <pre>
          <code className='text-xs lg:text-base break-all'>
            curl -s -H &apos;X-Team-Token: your_token&apos; -X PUT -d \<br />
            &apos;[&quot;PNFP4DKBOV6BTYL9YFGBQ9006582ADC=&quot;]&apos; \<br />
            {import.meta.env.VITE_BACKEND ?? `http://${document.location.hostname}`}/flags | jq .
          </code>
        </pre>
      </div>
      <OptionalRules />
    </>
  );
};
