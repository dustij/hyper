'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/infrastructure/auth/auth-client';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SignupFormSchema } from '../schemas';
import { SignupFormState } from '../types';

export default function SignupForm() {
  const router = useRouter();
  const [state, setState] = useState<SignupFormState>();
  const [pending, setPending] = useState(false);
  const [visible, setVisible] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setState(undefined);

    const formData = new FormData(event.currentTarget);

    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      setState({
        errors: validatedFields.error.flatten().fieldErrors,
      });
      setPending(false);
      return;
    }

    const { name, email, password } = validatedFields.data;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setPending(false);

    if (error) {
      setState({
        message: error.message,
      });
      return;
    }

    router.push('/');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col flex-1 max-w-96 gap-8 w-full'
    >
      <div className='grid gap-4'>
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='name'>Name</label>
          <Input
            name='name'
            placeholder='Bruce Banner'
            className={cn(state?.errors?.name && 'border-destructive ')}
          />
          {state?.errors?.name && (
            <div className='flex items-center gap-1'>
              <TriangleAlert size={18} className='text-destructive' />
              <p className='text-destructive'>{state.errors.name[0]}</p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='email'>Email</label>
          <Input
            name='email'
            placeholder='name@example.com'
            className={cn(state?.errors?.email && 'border-destructive')}
          />
          {state?.errors?.email && (
            <div className='flex items-center gap-1'>
              <TriangleAlert size={18} className='text-destructive' />
              <p className='text-destructive'>{state.errors.email[0]}</p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-1.5'>
          <label htmlFor='password'>Password</label>
          <div className='relative'>
            <Input
              name='password'
              placeholder='••••••••••••••'
              type={visible ? 'text' : 'password'}
              className={cn(state?.errors?.password && 'border-destructive')}
            />
            <Button
              type='button'
              variant='ghost'
              className='absolute right-1 active:not-aria-[haspopup]:translate-y-0'
              onClick={() => setVisible(!visible)}
            >
              {visible ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          {state?.errors?.password && (
            <div className='flex items-center gap-1'>
              <TriangleAlert size={18} className='text-destructive' />
              <p className='text-destructive'>{state.errors.password[0]}</p>
            </div>
          )}
        </div>
      </div>

      {state?.message && <p className='text-destructive'>{state.message}</p>}

      <Button size='lg' disabled={pending} type='submit'>
        {pending ? 'Creating account...' : 'Create Account'}
      </Button>

      <div className='flex justify-center'>
        <span>
          Already have an account?{' '}
          <a className='underline underline-offset-4' href='/login'>
            Login
          </a>
        </span>
      </div>
    </form>
  );
}
