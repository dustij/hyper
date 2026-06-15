import PageLayout from '@/components/shared/page-layout';
import { auth } from '@/infrastructure/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  return (
    <PageLayout title='Home'>
      <div className='bg-yellow-500'>test</div>
    </PageLayout>
  );
}
