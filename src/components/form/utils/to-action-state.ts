import { ZodError } from 'zod';

export type ActionState = {
  status?: 'SUCCESS' | 'ERROR';
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[]>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: '',
  fieldErrors: {},
  payload: undefined,
  timestamp: Date.now(),
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    console.log(error.issues);
    // if there is a zod error, return the first issue's message
    return {
      status: 'ERROR',
      message: '',
      fieldErrors: error.issues.reduce(
        (acc, issue) => {
          acc[issue.path[0] as string] = [issue.message]; // TODO: handle nested fields properly
          return acc;
        },
        {} as Record<string, string[]>
      ),
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    // if there is a generic error, return the error message
    return {
      status: 'ERROR',
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    // if there is an unknown error, return a generic error message
    return {
      status: 'ERROR',
      message: 'Unknown error',
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState['status'] = 'SUCCESS',
  message: string,
  formData?: FormData
) => {
  return {
    status,
    message,
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
  };
};
