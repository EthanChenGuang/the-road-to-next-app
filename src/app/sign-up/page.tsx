import Link from 'next/link';

import { CardCompact } from '@/components/card-compact';
import { SignUpForm } from '@/features/auth/components/sign-up-form';
import { paths } from '@/paths';

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center animate-fade-in-from-top">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        content={<SignUpForm />}
        className="w-full max-w-[420px] self-center"
        classNameTitle="text-2xl font-semibold tracking-tight"
        footer={
          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href={paths.signIn}
          >
            Already have an account? Sign in here.
          </Link>
        }
      />
    </div>
  );
};

export default SignUpPage;
