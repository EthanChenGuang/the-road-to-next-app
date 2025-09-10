'use client';

import clsx from 'clsx';
import { LucideLoaderCircle } from 'lucide-react';
import { cloneElement } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement<{ className?: string }>;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
};

const SubmitButton = ({ label, icon, variant, size, className }: SubmitButtonProps) => {
  const { pending: isPending } = useFormStatus();

  return (
    <Button type="submit" disabled={isPending} variant={variant} size={size} className={className}>
      {isPending && (
        <LucideLoaderCircle
          className={clsx('h-4 w-4 animate-spin', { 'mr-2': !!label })}
        />
      )}
      {label ? label : null}
      {isPending ? null : icon ? (
        <span className={clsx({ 'ml-0': !!label })}>
          {cloneElement(icon, {
            className: clsx('h-4 w-4', icon.props?.className),
          })}
        </span>
      ) : null}
    </Button>
  );
};

export { SubmitButton };
