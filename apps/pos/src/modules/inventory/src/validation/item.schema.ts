import { z } from 'zod';

export const ItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string({ error: 'Name should be string' }).min(1),
  quantity: z
    .number({ error: 'Quantity should be number' })
    .int()
    .nonnegative(),
  price: z.number({ error: 'Price should be number' }).nonnegative(),
  category: z.string().optional(),
});

export type Item = z.infer<typeof ItemSchema>;
