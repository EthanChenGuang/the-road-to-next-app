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
import { signIn } from '@/features/auth/actions/sign-in';

const SignInForm = () => {
  const [actionState, formAction] = useActionState(
    signIn,
    EMPTY_ACTION_STATE as ActionState
  );

  return (
    <Form action={formAction} actionState={actionState}>
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
      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
