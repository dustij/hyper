'use client';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Sidebar, { SidebarContext } from './sidebar';

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className='flex h-dvh overflow-hidden'>
        <div className='ml-3 mt-4 shrink-0'>
          <Sidebar />
        </div>
        <main className='my-1 mr-1 ml-3 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-background p-3 shadow'>
          {children}
        </main>
      </div>
      <ToastContainer />
    </SidebarContext.Provider>
  );
}
