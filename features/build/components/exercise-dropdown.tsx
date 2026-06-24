import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, MoreVertical, Trash } from 'lucide-react';

type ExerciseDropdownProps = {
  onMoveExercise: (direction: 'up' | 'down') => void;
};

export default function ExerciseDropdown({
  onMoveExercise,
}: ExerciseDropdownProps) {
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
            onClick={() => onMoveExercise('up')}
          >
            <ArrowUp className='text-muted-foreground mr-2' />
            Move up
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-muted-foreground'
            onClick={() => onMoveExercise('down')}
          >
            <ArrowDown className='text-muted-foreground mr-2' />
            Move down
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
