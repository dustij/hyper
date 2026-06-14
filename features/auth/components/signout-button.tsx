'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/infrastructure/auth/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    const { error } = await authClient.signOut();
    setPending(false);

    if (error) {
      throw new Error(`Error occurred while trying to sign out: {error}`);
    }

    router.replace('/login');
    router.refresh();
  }

  return (
    <div>
      <Button disabled={pending} onClick={handleSignOut}>
        {pending ? 'Signing out...' : 'Sign Out'}
      </Button>
    </div>
  );
}
