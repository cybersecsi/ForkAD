export const Rules = () => {
  return (
    <>
      <h1 className='text-cTertiary text-4xl mb-6'>Rules</h1>
      <div className='grid grid-cols-2 gap-4'>
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
          <code>
            curl -s -H &apos;X-Team-Token: your_secret_token&apos; -X PUT -d \<br />
            &apos;[&quot;PNFP4DKBOV6BTYL9YFGBQ9006582ADC=&quot;]&apos;{' '}
            {import.meta.env.VITE_BACKEND ?? `http://${document.location.hostname}`}/flags | jq .
          </code>
        </pre>
      </div>
    </>
  );
};
