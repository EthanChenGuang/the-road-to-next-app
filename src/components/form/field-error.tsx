import { ActionState } from './utils/to-action-state';

type FieldErrorProps = {
  actionState: ActionState;
  field: string;
};

const FieldError = ({ actionState, field }: FieldErrorProps) => {
  if (!actionState.fieldErrors?.[field]) {
    return null;
  }

  return (
    <p className="text-xs text-red-500">
      {actionState.fieldErrors?.[field][0]}
    </p>
  );
};

export { FieldError };
