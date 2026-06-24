import { Button } from '@/components/ui/button';
import { HandFist, ShelvingUnit } from 'lucide-react';
import AutoWidthInput from '../../../components/shared/auto-width-input';
import type { DraftDay as DraftDayModel } from '../types';
import DayDropdown from './day-dropdown';
import ExerciseDropdown from './exercise-dropdown';

type DraftDayProps = {
  day: DraftDayModel;
  onAddExercise: () => void;
  onMoveExercise: (exerciseIndex: number, direction: 'up' | 'down') => void;
  onMoveDraftDay: (direction: 'left' | 'right') => void;
};

export default function DraftDay({
  day,
  onAddExercise,
  onMoveExercise,
  onMoveDraftDay,
}: DraftDayProps) {
  return (
    <section className='flex shrink-0 flex-col border-r border-sidebar-border bg-background'>
      <div className='border-b border-sidebar-border px-4 py-3 flex justify-between items-center'>
        <input
          type='text'
          placeholder={day.name}
          className='text-lg font-medium text-card-foreground px-1.5 py-1'
        />
        <DayDropdown
          onMoveDraftDay={(direction) => onMoveDraftDay(direction)}
        />
      </div>

      <div className='flex flex-col gap-3 p-4'>
        {day.exercises.length > 0 ? (
          day.exercises.map((exercise, exerciseIndex) => (
            <div
              key={exercise.id}
              className='rounded-md border border-border bg-card p-3 shadow-xs'
            >
              <div className='flex justify-between'>
                <input
                  type='text'
                  name=''
                  id=''
                  placeholder='Name'
                  className='font-medium text-card-foreground px-1'
                />
                <ExerciseDropdown
                  onMoveExercise={(direction) =>
                    onMoveExercise(exerciseIndex, direction)
                  }
                />
              </div>
              <div className='flex gap-2'>
                <div className='flex items-center gap-1'>
                  <HandFist className='size-3.5 text-muted-foreground' />
                  <AutoWidthInput
                    type='text'
                    name=''
                    id=''
                    placeholder='Muscle group'
                    className='text-sm text-muted-foreground'
                  />
                </div>
                <div className='flex items-center gap-1'>
                  <ShelvingUnit className='size-3.5 text-muted-foreground' />
                  <AutoWidthInput
                    type='text'
                    name=''
                    id=''
                    placeholder='Equipment'
                    className='text-sm text-muted-foreground'
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-sm text-muted-foreground'>No exercises yet.</p>
        )}
        <Button variant='ghost' onClick={onAddExercise} type='button'>
          + Add exercise
        </Button>
      </div>
    </section>
  );
}
