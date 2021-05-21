import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const toastError = (e: Error | AxiosError) => {
  toast.error((e as AxiosError).response?.data?.message || e.message);
};
