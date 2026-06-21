import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

type SidebarItemProps = {
  pathname: string;
  label: string;
  Icon: LucideIcon;
  isActive: boolean;
};

export default function SidebarItem({
  pathname,
  label,
  Icon,
  isActive,
}: SidebarItemProps) {
  return (
    <Button
      asChild
      variant='ghost'
      size='lg'
      className={cn(
        'justify-start gap-0 overflow-hidden px-0 hover:bg-sidebar-border',
        isActive && 'bg-sidebar-border',
      )}
    >
      <Link href={pathname}>
        <div className='flex'>
          <span className='shrink-0 px-1.75'>
            <Icon className='size-5' />
          </span>
          <p className='ml-4 flex-1'>{label}</p>
        </div>
      </Link>
    </Button>
  );
}
