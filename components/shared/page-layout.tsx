'use client';

import { SidebarClose, SidebarOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { useSidebar } from './sidebar';

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function PageLayout({ title, children }: PageLayoutProps) {
  const { expanded, setExpanded } = useSidebar();

  return (
    <div className='flex h-full min-h-0 min-w-0 flex-col'>
      <div className='flex shrink-0 items-center gap-2'>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? (
            <SidebarClose className='size-5 text-muted-foreground' />
          ) : (
            <SidebarOpen className='size-5 text-muted-foreground' />
          )}
        </Button>
        <h1 className='text-title text-muted-foreground'>{title}</h1>
      </div>
      <div className='min-h-0 min-w-0 flex-1 overflow-hidden px-2'>
        {children}
      </div>
    </div>
  );
}
