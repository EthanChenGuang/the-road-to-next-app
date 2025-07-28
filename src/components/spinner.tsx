import { LucideLoader2 } from 'lucide-react';

export const Spinner = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center">
      <LucideLoader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};
