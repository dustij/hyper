'use client';

import { useState } from 'react';
import Sidebar, { SidebarContext } from './sidebar';

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className='flex min-h-dvh'>
        <div className='ml-3 mt-4'>
          <Sidebar />
        </div>
        <main className='flex-1 bg-background p-3 rounded-xl my-1 mr-1 ml-3 shadow'>
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
