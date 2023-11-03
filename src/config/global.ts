import { IStatuses } from '@/types';

export const STATUS_CONFIG: IStatuses = {
  101: {
    name: 'UP',
    bg: 'bg-cServiceUp',
  },
  102: {
    name: 'CORRUPT',
    bg: 'bg-cServiceCorrupt',
  },
  103: {
    name: 'MUMBLE',
    bg: 'bg-cServiceMumble',
  },
  104: {
    name: 'DOWN',
    bg: 'bg-cServiceDown',
  },
  110: {
    name: 'CHECK FAILED',
    bg: 'bg-cServiceCheckFailed',
  },
  '-1': {
    name: 'OFFLINE',
    bg: 'bg-cServiceOffline',
  },
};
