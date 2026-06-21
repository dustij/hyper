import PageLayout from '@/components/shared/page-layout';
import { auth } from '@/infrastructure/auth/auth';
import { titleCase } from '@/lib/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  return (
    <PageLayout title='Home'>
      <h1 className='text-heading'>
        Welcome back, {titleCase(session.user.name)}
      </h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
        repellat harum tempore? Eligendi sint, quidem neque iusto necessitatibus
        doloribus beatae accusamus ex, blanditiis, tenetur eaque sapiente
        debitis veritatis ducimus. Assumenda!
      </p>
      <h1 className='text-heading'>Here's where we left off</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto ratione
        nemo dolorem fugit excepturi quia non pariatur. Unde accusantium
        explicabo, velit quibusdam exercitationem, cumque, libero aliquid
        similique hic molestias porro!
      </p>
    </PageLayout>
  );
}
