'use client';

import { cn } from '@/lib/utils';
import { ClipboardEdit, Dumbbell, Home, List } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { createContext, useContext } from 'react';
import SidebarItem from './sidebar-item';

type SidebarContextValue = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const sidebarItems = [
  { pathname: '/', label: 'Home', icon: Home },
  { pathname: '/current', label: 'Current', icon: Dumbbell },
  { pathname: '/build', label: 'Build', icon: ClipboardEdit },
  { pathname: '/mesocycles', label: 'Mesocycles', icon: List },
];

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
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.pathname}
            pathname={item.pathname}
            label={item.label}
            Icon={item.icon}
            isActive={pathname === item.pathname}
          />
        ))}
      </div>
    </div>
  );
}
