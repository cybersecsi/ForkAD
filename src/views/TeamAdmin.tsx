import { Loading } from '@/components';
import { AdminRESTManagerInstance } from '@/rest';
import { IAdminCtfTeam } from '@/types/IForcad';
import { sleep } from '@/utils/helpers';
import { numericRegex } from '@/utils/regex';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type createOrEditTeamInputs = {
  name: string;
  ip: string;
  highlighted: boolean;
  active: boolean;
  token: string;
};

export const TeamAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const location = useLocation();
  const { teamId } = useParams();
  const { register, handleSubmit, formState } = useForm<createOrEditTeamInputs>();
  // If in edit mode
  const [teamToEdit, setTeamToEdit] = useState<IAdminCtfTeam>();

  useEffect(() => {
    if (location.pathname.includes('create-team')) {
      setIsLoading(false);
    } else {
      setIsEditMode(true);
      loadTeam();
    }
  }, []);

  const loadTeam = async () => {
    try {
      if (!teamId || !teamId.match(numericRegex)) {
        toast.error('Error while loading team');
        navigate('/');
        throw new Error('Missing or wrong Team ID');
      }
      const res = await AdminRESTManagerInstance.getTeam(parseInt(teamId));
      setTeamToEdit(res.data);
      setIsLoading(false);
    } catch {
      toast.error('Error while loading team');
      await sleep(500);
      navigate('/');
    }
  };

  const onSave: SubmitHandler<createOrEditTeamInputs> = async (data: createOrEditTeamInputs) => {
    try {
      setIsLoading(true);
      if (isEditMode && teamId && teamId.match(numericRegex)) {
        const teamIdInt = parseInt(teamId);
        await AdminRESTManagerInstance.updateTeam(teamIdInt, { ...data, id: teamIdInt });
      } else if (!isEditMode) {
        await AdminRESTManagerInstance.createTeam(data);
      } else {
        return;
      }
      await sleep(500);
      const toastMsg = isEditMode ? 'Team correctly updated' : 'Team correctly created';
      await loadTeam();
      setIsLoading(false);
      toast.success(toastMsg);
    } catch {
      toast.error('Error while updating team');
      setIsLoading(false);
    }
  };

  if (isLoading || (isEditMode && !teamToEdit)) {
    return <Loading blur={true} />;
  }

  const titleMessage = isEditMode
    ? `Edit Team ${(teamToEdit as IAdminCtfTeam).name}`
    : 'Create Team';

  return (
    <>
      <h1 className='text-cTertiary font-semibold text-4xl mb-6'>{titleMessage}</h1>
      {/* Form */}
      <form onSubmit={handleSubmit(onSave)} className='w-full md:w-1/2 grid grid-cols-1 gap42'>
        {/* Name */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Name:</p>
          <div className='w-full h-12'>
            <input
              {...register('name', {
                required: true,
              })}
              defaultValue={isEditMode && teamToEdit ? teamToEdit.name : ''}
              className='custom-textfield'
              type='text'
              placeholder='Name'
            />
          </div>
        </div>
        {/* IP Address */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>IP:</p>
          <div className='w-full h-12'>
            <input
              {...register('ip', {
                required: true,
              })}
              defaultValue={isEditMode && teamToEdit ? teamToEdit.ip : ''}
              className='custom-textfield'
              type='text'
              placeholder='IP Address'
            />
          </div>
        </div>
        {/* Token */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Token:</p>
          <div className='w-full h-12'>
            <input
              {...register('token', {
                required: true,
              })}
              defaultValue={isEditMode && teamToEdit ? teamToEdit.token : ''}
              className='custom-textfield'
              type='text'
              placeholder='Token'
            />
          </div>
        </div>
        {/* Highlighted */}
        <div className='flex flex-col items-center w-full gap-2 mt-2'>
          <div className='w-full h-8'>
            <label className='whitespace-nowrap mr-2'>Highlighted:</label>
            <input
              {...register('highlighted')}
              className='custom-input-checkbox cursor-pointer'
              id='highlighted'
              type='checkbox'
              defaultChecked={isEditMode && teamToEdit ? teamToEdit.highlighted : false}
            />
          </div>
        </div>
        {/* Active */}
        <div className='flex flex-col items-center w-full gap-2'>
          <div className='w-full h-8'>
            <label className='whitespace-nowrap mr-2'>Active:</label>
            <input
              {...register('active')}
              className='custom-input-checkbox cursor-pointer'
              id='active'
              type='checkbox'
              defaultChecked={isEditMode && teamToEdit ? teamToEdit.active : true}
            />
          </div>
        </div>
        <button
          disabled={!formState.isValid}
          className='flex justify-center my-2 p-2 items-center gap-4 border-gray-100 bg-cTertiary hover:bg-cQuaternary rounded-md cursor-pointer transition-colors duration-200 text-cPrimary disabled:bg-gray-400'
        >
          Salva
        </button>
      </form>
    </>
  );
};
