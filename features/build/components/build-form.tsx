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
];

export default function BuildForm() {
  const [pending, setPending] = useState(false);
  const [draftDays, setDraftDays] =
    useState<DraftDayModel[]>(INITIAL_DRAFT_DAYS);
  const addDayDisabled = draftDays.length >= 7;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    const target = event.target;

    if (event.key === 'Enter' && target instanceof HTMLInputElement) {
      event.preventDefault();
      target.blur();
    }
  }

  function addDraftDay() {
    if (addDayDisabled) {
      return;
    }

    const dayNumber = draftDays.length + 1;

    setDraftDays([
      ...draftDays,
      { id: crypto.randomUUID(), name: `Day ${dayNumber}`, exercises: [] },
    ]);
  }

  function addExercise(thisIndex: number) {
    setDraftDays(
      draftDays.map((day, thatIndex) => {
        if (thisIndex !== thatIndex) {
          return day;
        }
        return {
          ...day,
          exercises: [
            ...day.exercises,
            {
              id: crypto.randomUUID(),
              name: 'Name',
              muscleGroup: 'Muscle group',
              equipment: 'Equipment',
            },
          ],
        };
      }),
    );
  }

  function moveExercise(
    thisExerciseIndex: number,
    thisDayIndex: number,
    direction: 'up' | 'down',
  ) {
    if (direction === 'up') {
      if (thisExerciseIndex === 0) {
        return;
      }
      setDraftDays(
        draftDays.map((day, thatDayIndex) => {
          if (thisDayIndex !== thatDayIndex) return day;
          return {
            ...day,
            exercises: day.exercises.map((exercise, thatExerciseIndex) => {
              if (thatExerciseIndex < thisExerciseIndex - 1) return exercise;
              else if (thatExerciseIndex === thisExerciseIndex - 1)
                return day.exercises[thisExerciseIndex];
              else if (thatExerciseIndex === thisExerciseIndex)
                return day.exercises[thisExerciseIndex - 1];
              else return exercise;
            }),
          };
        }),
      );
    } else if (direction === 'down') {
      if (thisExerciseIndex === draftDays[thisDayIndex].exercises.length - 1) {
        return;
      }
      setDraftDays(
        draftDays.map((day, thatDayIndex) => {
          if (thisDayIndex !== thatDayIndex) return day;
          return {
            ...day,
            exercises: day.exercises.map((exercise, thatExerciseIndex) => {
              if (thatExerciseIndex < thisExerciseIndex) return exercise;
              else if (thatExerciseIndex === thisExerciseIndex)
                return day.exercises[thisExerciseIndex + 1];
              else if (thatExerciseIndex === thisExerciseIndex + 1)
                return day.exercises[thisExerciseIndex];
              else return exercise;
            }),
          };
        }),
      );
    }
  }

  function moveDraftDay(thisIndex: number, direction: 'left' | 'right') {
    if (direction === 'left') {
      if (thisIndex === 0) {
        return;
      }
      setDraftDays(
        draftDays.map((draftDay, thatIndex) => {
          if (thatIndex < thisIndex - 1) {
            return draftDay;
          } else if (thatIndex === thisIndex - 1) {
            return draftDays[thisIndex];
          } else if (thatIndex === thisIndex) {
            return draftDays[thisIndex - 1];
          } else {
            return draftDay;
          }
        }),
      );
    } else if (direction === 'right') {
      if (thisIndex === draftDays.length - 1) {
        return;
      }
      setDraftDays(
        draftDays.map((draftDay, thatIndex) => {
          if (thatIndex < thisIndex) return draftDay;
          else if (thatIndex === thisIndex) return draftDays[thisIndex + 1];
          else if (thatIndex === thisIndex + 1) return draftDays[thisIndex];
          else return draftDay;
        }),
      );
    }
  }

  return (
    <form
      className='h-full min-h-0 min-w-0'
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
    >
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
            {draftDays.map((day, dayIndex) => (
              <DraftDay
                key={day.id}
                day={day}
                onAddExercise={() => addExercise(dayIndex)}
                onMoveExercise={(exerciseIndex, direction) =>
                  moveExercise(exerciseIndex, dayIndex, direction)
                }
                onMoveDraftDay={(direction) =>
                  moveDraftDay(dayIndex, direction)
                }
              />
            ))}
            <div>
              <Button
                variant='ghost'
                className='h-full text-xl hover:bg-sidebar-border text-muted-foreground'
                onClick={addDraftDay}
                disabled={addDayDisabled}
                type='button'
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
