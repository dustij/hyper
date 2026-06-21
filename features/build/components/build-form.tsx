'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { DraftDay as DraftDayModel } from '../types';
import DraftDay from './draft-day';

const INITIAL_DRAFT_DAYS: DraftDayModel[] = [
  {
    id: 'day-1',
    name: 'Day 1',
    exercises: [],
  },
  {
    id: 'day-2',
    name: 'Day 2',
    exercises: [],
  },
  {
    id: 'day-3',
    name: 'Day 3',
    exercises: [],
  },
  {
    id: 'day-4',
    name: 'Day 4',
    exercises: [],
  },
];

export default function BuildForm() {
  const [pending, setPending] = useState(false);
  const [draftDays] = useState<DraftDayModel[]>(INITIAL_DRAFT_DAYS);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
  }

  return (
    <form className='h-full min-h-0 min-w-0' onSubmit={handleSubmit}>
      <div className='flex h-full min-h-0 min-w-0 flex-col gap-3 pt-3'>
        <div className='flex justify-between'>
          <input
            type='text'
            name='template-name'
            id='template-name'
            placeholder='Untitled'
            className='text-title shrink-0 px-2 py-1.25 text-ellipsis'
          />
          <Button
            size='lg'
            disabled={pending}
            type='submit'
            className='min-w-20'
          >
            {pending ? 'Saving...' : 'Save'}
          </Button>
        </div>
        <div className='min-h-0 min-w-0 flex-1 overflow-auto bg-sidebar'>
          <div className='flex min-h-full w-max'>
            {draftDays.map((day) => (
              <DraftDay key={day.id} day={day} />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
