import Link from 'next/link';

import { CardCompact } from '@/components/card-compact';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { paths } from '@/paths';

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center animate-fade-in-from-top">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        className="w-full max-w-[420px] self-center"
        classNameTitle="text-2xl font-semibold tracking-tight"
        footer={
          <div className="flex justify-between w-full">
            <Link className="text-sm text-muted-foreground" href={paths.signUp}>
              No account yet?
            </Link>

            <Link
              className="text-sm text-muted-foreground"
              href={paths.passwordForgot}
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default SignInPage;
