import * as z from 'zod';

export const MAX_MESOCYCLE_DAYS = 7;

export const MesocycleTemplateExerciseSchema = z.object({
  name: z.string().trim().min(1, { error: 'Exercise name is required.' }),
  muscleGroup: z.string().trim().min(1, { error: 'Muscle group is required.' }),
  equipment: z.string().trim().min(1, { error: 'Equipment is required.' }),
});

export const MesocycleTemplateDaySchema = z.object({
  name: z.string().trim().min(1, { error: 'Day name is required.' }),
  exercises: z
    .array(MesocycleTemplateExerciseSchema)
    .min(1, { error: 'Add at least one exercise.' }),
});

export const CreateMesocycleTemplateSchema = z.object({
  name: z.string().trim().min(1, { error: 'Mesocycle name is required.' }),
  days: z
    .array(MesocycleTemplateDaySchema)
    .min(1, { error: 'Add at least one day.' })
    .max(MAX_MESOCYCLE_DAYS, {
      error: 'A mesocycle template can include up to 7 days.',
    }),
});
