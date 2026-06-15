'use client';

import { cn } from '@/lib/utils';
import { Dumbbell, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useContext } from 'react';
import { Button } from '../ui/button';

type SidebarContextValue = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextValue>({
  expanded: false,
  setExpanded: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function Sidebar() {
  const pathname = usePathname();
  const { expanded } = useSidebar();

  return (
    <div
      className={cn(
        'h-full overflow-hidden transition-[width] bg-sidebar text-muted-foreground',
        expanded ? 'w-60' : 'w-9',
      )}
    >
      <div className='flex flex-col gap-3'>
        <Button
          asChild
          variant='ghost'
          size='lg'
          className={cn(
            'justify-start gap-0 overflow-hidden px-0 hover:bg-sidebar-border',
            pathname === '/' && 'bg-sidebar-border',
          )}
        >
          <Link href='/'>
            <div className='flex'>
              <span className='shrink-0 px-1.75'>
                <Home className='size-5' />
              </span>
              <p className='ml-4 flex-1'>Home</p>
            </div>
          </Link>
        </Button>
        <Button
          asChild
          variant='ghost'
          size='lg'
          className={cn(
            'justify-start gap-0 overflow-hidden px-0 hover:bg-sidebar-border',
            pathname === '/current' && 'bg-sidebar-border',
          )}
        >
          <Link href='/current'>
            <div className='flex'>
              <span className='shrink-0 px-1.75'>
                <Dumbbell className='size-5' />
              </span>
              <p className='ml-4 flex-1'>Current</p>
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
}
