import Sidebar from '@/components/shared/sidebar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-dvh'>
      <div className='ml-3 mt-4'>
        <Sidebar />
      </div>
      <main className='flex-1 bg-background-card p-3 rounded-xl my-1 mr-1 ml-3 shadow'>
        {children}
      </main>
    </div>
  );
}
