import { Form, Formik } from 'formik';
import React from 'react';
import { z } from 'zod';

interface ReusableFormProps<T extends z.ZodRawShape> {
  children: React.ReactNode;
  className?: string;
  initialValues: z.infer<z.ZodObject<T>>;
  validateRules: z.ZodObject<T>;
  onSubmit: (values: z.infer<z.ZodObject<T>>) => void;
}

export const ReusableForm = <T extends z.ZodRawShape>({
  children,
  className,
  initialValues,
  validateRules,
  onSubmit,
}: ReusableFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const result = validateRules.safeParse(values);
        if (result.success) return {};
        const errors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0];
          if (path) {
            errors[path as string] = issue.message;
          }
        });
        return errors;
      }}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      <Form className={className}>{children}</Form>
    </Formik>
  );
};
