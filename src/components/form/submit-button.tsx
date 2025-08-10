import { LucideLoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending: isPending } = useFormStatus();

  return (
    <Button type="submit" disabled={isPending}>
      {isPending && (
        <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      )}
      {label}
    </Button>
  );
};

export { SubmitButton };
