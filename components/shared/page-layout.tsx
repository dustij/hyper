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
    <div>
      <div className='flex items-center gap-2'>
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
        <h1 className='text-title'>{title}</h1>
      </div>
      <div className='px-2'>{children}</div>
    </div>
  );
}
