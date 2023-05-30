import type { HandleServerError } from '@sveltejs/kit';
import LogRocket from 'logrocket';
export const handleError = (({ error, event }) => {
  LogRocket.captureException(error, {
    extra: event,
  });
  return {
    message: 'Whoops!',
    code: error?.code ?? 'UNKNOWN'
  };
}) satisfies HandleServerError;
