// validation/business.schema.ts
import { z } from 'zod';

export const businessSchema = z.object({
  name: z.string().min(1, 'Business name is required.'),
  type: z.string().min(1, 'Select a business type.'),
  location: z.string().min(1, 'Select a location.'),
  website: z.string().url('Enter a valid website.'),
  logoFile: z.any().optional(), // File validation can be added later
});

export const contactSchema = z.object({
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Phone number is required'),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  state: z.string().min(1, 'Select a state'),
  city: z.string().min(1, 'Select a city'),
  zip: z.string().min(4, 'Zip code is required'),
});

export const otherInfoSchema = z.object({
  fiscalYear: z.string().min(4, 'Fiscal year is required'),
  baseCurrency: z.string().min(1, 'Select a currency'),
  timeZone: z.string().min(1, 'Select a time zone'),
  dateFormat: z.string().min(1, 'Select a date format'),
  language: z.string().min(1, 'Select a language'),
});
