import type { DraftDay as DraftDayModel } from '../types';

type DraftDayProps = {
  day: DraftDayModel;
};

export default function DraftDay({ day }: DraftDayProps) {
  return (
    <section className='flex shrink-0 flex-col border-r border-sidebar-border bg-background'>
      <div className='border-b border-sidebar-border px-4 py-3'>
        <input
          type='text'
          placeholder='Day 1'
          className='text-lg font-medium text-card-foreground px-1.5 py-1'
        />
        {/* <h2 className='text-lg font-medium text-card-foreground'>{day.name}</h2> */}
      </div>

      <div className='flex flex-col gap-3 p-4'>
        {day.exercises.length > 0 ? (
          day.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className='rounded-md border border-border bg-card p-3'
            >
              <p className='font-medium text-card-foreground'>
                {exercise.name}
              </p>
              <p className='text-sm text-muted-foreground'>
                {exercise.muscleGroup} - {exercise.equipment}
              </p>
            </div>
          ))
        ) : (
          <p className='text-sm text-muted-foreground'>No exercises yet.</p>
        )}
      </div>
    </section>
  );
}
