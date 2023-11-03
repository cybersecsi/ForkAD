import { Loading } from '@/components';
import { AdminRESTManagerInstance } from '@/rest';
import { IAdminCtfTask } from '@/types';
import { sleep } from '@/utils/helpers';
import { numericRegex } from '@/utils/regex';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type createOrEditTaskInputs = {
  name: string;
  active: boolean;
  checker: string;
  checker_timeout: number;
  checker_type: string;
  default_score: number;
  env_path: string;
  get_period: number;
  gets: number;
  puts: number;
  places: number;
};

export const TaskAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const location = useLocation();
  const { taskId } = useParams();
  const { register, handleSubmit, formState } = useForm<createOrEditTaskInputs>();
  // If in edit mode
  const [taskToEdit, setTaskToEdit] = useState<IAdminCtfTask>();

  useEffect(() => {
    if (location.pathname.includes('create-task')) {
      setIsLoading(false);
    } else {
      setIsEditMode(true);
      loadTask();
    }
  }, []);

  const loadTask = async () => {
    try {
      if (!taskId || !taskId.match(numericRegex)) {
        toast.error('Error while loading task');
        navigate('/');
        throw new Error('Missing or wrong Task ID');
      }
      const res = await AdminRESTManagerInstance.getTask(parseInt(taskId));
      setTaskToEdit(res.data);
      setIsLoading(false);
    } catch {
      toast.error('Error while loading task');
      await sleep(500);
      navigate('/');
    }
  };

  const onSave: SubmitHandler<createOrEditTaskInputs> = async (data: createOrEditTaskInputs) => {
    try {
      setIsLoading(true);
      if (isEditMode && taskId && taskId.match(numericRegex)) {
        const taskIdInt = parseInt(taskId);
        await AdminRESTManagerInstance.updateTask(taskIdInt, { ...data, id: taskIdInt });
      } else if (!isEditMode) {
        await AdminRESTManagerInstance.createTask(data);
      } else {
        return;
      }
      await sleep(500);
      const toastMsg = isEditMode ? 'Task correctly updated' : 'Task correctly created';
      setIsLoading(false);
      toast.success(toastMsg);
      await sleep(1000);
      navigate('/admin');
    } catch {
      toast.error('Error while updating task');
      setIsLoading(false);
    }
  };

  if (isLoading || (isEditMode && !taskToEdit)) {
    return <Loading blur={true} />;
  }

  const titleMessage = isEditMode
    ? `Edit Task ${(taskToEdit as IAdminCtfTask).name}`
    : 'Create Task';

  return (
    <>
      <h1 className='text-cTertiary font-semibold text-4xl mb-6'>{titleMessage}</h1>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSave)}
        className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4'
      >
        {/* Name */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Name:</p>
          <div className='w-full h-12'>
            <input
              {...register('name', {
                required: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.name : ''}
              className='custom-textfield'
              type='text'
              placeholder='Name'
            />
          </div>
        </div>
        {/* Checker */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Checker:</p>
          <div className='w-full h-12'>
            <input
              {...register('checker', {
                required: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.checker : ''}
              className='custom-textfield'
              type='text'
              placeholder='Checker'
            />
          </div>
        </div>
        {/* Gets */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Gets:</p>
          <div className='w-full h-12'>
            <input
              {...register('gets', {
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.gets : 1}
              className='custom-textfield'
              type='number'
              placeholder='Gets'
            />
          </div>
        </div>
        {/* Puts */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Puts:</p>
          <div className='w-full h-12'>
            <input
              {...register('puts', {
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.puts : 1}
              className='custom-textfield'
              type='number'
              placeholder='Puts'
            />
          </div>
        </div>
        {/* Places */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Places:</p>
          <div className='w-full h-12'>
            <input
              {...register('places', {
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.places : 1}
              className='custom-textfield'
              type='number'
              placeholder='Places'
            />
          </div>
        </div>
        {/* Checker Timeout */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Checker Timeout:</p>
          <div className='w-full h-12'>
            <input
              {...register('checker_timeout', {
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.checker_timeout : 20}
              className='custom-textfield'
              type='number'
              placeholder='Checker Timeout'
            />
          </div>
        </div>
        {/* Checker Type */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Checker Type:</p>
          <div className='w-full h-12'>
            <input
              {...register('checker_type', {
                required: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.checker_type : 'hackerdom'}
              className='custom-textfield'
              type='text'
              placeholder='Checker Type'
            />
          </div>
        </div>
        {/* ENV Path */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Env Path:</p>
          <div className='w-full h-12'>
            <input
              {...register('env_path')}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.env_path : ''}
              className='custom-textfield'
              type='text'
              placeholder='Env Path'
            />
          </div>
        </div>
        {/* Get Period */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Get Period:</p>
          <div className='w-full h-12'>
            <input
              {...register('get_period', {
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.get_period : 10}
              className='custom-textfield'
              type='number'
              placeholder='Get Period'
            />
          </div>
        </div>
        {/* Default Score */}
        <div className='flex flex-col items-center w-full gap-2'>
          <p className='w-full whitespace-nowrap'>Default Score:</p>
          <div className='w-full h-12'>
            <input
              {...register('default_score', {
                required: true,
                valueAsNumber: true,
              })}
              defaultValue={isEditMode && taskToEdit ? taskToEdit.default_score : 2500}
              className='custom-textfield'
              type='number'
              placeholder='Default Score'
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
              defaultChecked={isEditMode && taskToEdit ? taskToEdit.active : true}
            />
          </div>
        </div>
        <button
          disabled={!formState.isValid}
          className='flex justify-center col-start-1 my-2 p-2 items-center gap-4 border-gray-100 bg-cTertiary hover:bg-cQuaternary rounded-md cursor-pointer transition-colors duration-200 text-cPrimary disabled:bg-gray-400'
        >
          Salva
        </button>
      </form>
    </>
  );
};
