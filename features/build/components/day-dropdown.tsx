import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, ArrowRight, MoreVertical, Trash } from 'lucide-react';

type DayDropdownProps = {
  onMoveDraftDay: (direction: 'left' | 'right') => void;
};

export default function DayDropdown({ onMoveDraftDay }: DayDropdownProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            type='button'
            size='icon'
            className='text-muted-foreground'
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className='text-muted-foreground'
            onClick={() => onMoveDraftDay('left')}
          >
            <ArrowLeft className='text-muted-foreground mr-2' />
            Move left
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-muted-foreground'
            onClick={() => onMoveDraftDay('right')}
          >
            <ArrowRight className='text-muted-foreground mr-2' />
            Move right
          </DropdownMenuItem>
          <DropdownMenuItem className='text-muted-foreground'>
            <Trash className='text-muted-foreground mr-2' />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
