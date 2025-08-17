'use client';

import { useActionState } from 'react';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';

import { signUp } from '../actions/sign-up';

const SignUpForm = () => {
  const [actionState, formAction] = useActionState(
    signUp,
    EMPTY_ACTION_STATE as ActionState
  );

  return (
    <Form action={formAction} actionState={actionState}>
      <Input
        name="username"
        placeholder="Username"
        type="text"
        defaultValue={actionState.payload?.get('username')?.toString() ?? ''}
      />
      <FieldError actionState={actionState} field="username" />
      <Input
        name="email"
        placeholder="Email"
        type="email"
        defaultValue={actionState.payload?.get('email')?.toString() ?? ''}
      />
      <FieldError actionState={actionState} field="email" />
      <Input
        name="password"
        placeholder="Password"
        type="password"
        defaultValue={actionState.payload?.get('password')?.toString() ?? ''}
      />
      <FieldError actionState={actionState} field="password" />
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
      />
      <FieldError
        actionState={actionState}
        field="confirmPassword"
        // defaultValue={actionState.payload?.get('confirmPassword')?.toString() ?? ''}
      />
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export { SignUpForm };
