'use client';

import { cloneElement, ReactElement, useActionState, useEffect,useState } from 'react';
import { toast } from 'sonner';

import { SubmitButton } from './form/submit-button';
import { ActionState, EMPTY_ACTION_STATE } from './form/utils/to-action-state';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  action: (formData: FormData) => Promise<ActionState>;
  trigger: ReactElement;
};

const useConfirmDialog = ({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. Make sure you want to proceed.',
  action,
  trigger,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  //   const dialogTrigger = (
  //     <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
  //   );

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      setIsOpen(true);
    },
    onSelect: () => {
      // Small delay to ensure dropdown closes before dialog opens
      setTimeout(() => setIsOpen(true), 0);
    },
  } as Record<string, unknown>) as ReactElement;

  const [actionState, formAction] = useActionState(
    async (_state: ActionState, formData: FormData) => {
      const result = await action(formData);
      
      // Show toast immediately since form might get unmounted
      if (result.status === 'SUCCESS' && result.message) {
        toast.success(result.message);
      } else if (result.status === 'ERROR' && result.message) {
        toast.error(result.message);
      }
      
      return result;
    },
    EMPTY_ACTION_STATE
  );

  // Close dialog when action succeeds
  useEffect(() => {
    if (actionState.status === 'SUCCESS') {
      // Small delay to ensure toast appears before dialog closes
      setTimeout(() => setIsOpen(false), 200);
    }
  }, [actionState.status]);

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={formAction} className="flex flex-col gap-y-2">
              <SubmitButton label="Confirm" />
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
