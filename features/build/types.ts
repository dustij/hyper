import type * as z from 'zod';
import type {
  MesocycleTemplateDaySchema,
  MesocycleTemplateExerciseSchema,
} from './schemas';

export type BuildFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
    }
  | undefined;

export type DraftExercise = z.infer<typeof MesocycleTemplateExerciseSchema> & {
  id: string;
};

export type DraftDay = Omit<
  z.infer<typeof MesocycleTemplateDaySchema>,
  'exercises'
> & {
  id: string;
  exercises: DraftExercise[];
};
