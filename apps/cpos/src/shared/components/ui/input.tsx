import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyUp?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  wrapperClass?: string;
  labelClass?: string;
  inputClass?: string;
  as?: 'input' | 'textarea';
  rows?: number;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onKeyDown,
  onKeyUp,
  placeholder,
  required = false,
  wrapperClass = '',
  labelClass = '',
  inputClass = '',
  as = 'input',
  rows,
  ref,
}) => {
  return (
    <div className={wrapperClass}>
      <label className={`block font-poppins mb-4 ${labelClass}`}>{label}</label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`w-full border rounded-md focus:outline-none focus:ring-2 ${inputClass}`}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          ref={ref as React.Ref<HTMLInputElement>}
          placeholder={placeholder}
          required={required}
          className={`w-full border rounded-md focus:outline-none focus:ring-2 ${inputClass}`}
        />
      )}
    </div>
  );
};
