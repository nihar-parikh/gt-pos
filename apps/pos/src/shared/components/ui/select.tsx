interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  labelClass?: string;
  selectClass?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  required = false,
  labelClass = '',
  selectClass = '',
}) => {
  return (
    <div>
      <label htmlFor={name} className={`block font-poppins ${labelClass}`}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border rounded-md focus:outline-none focus:ring-2 mb-3 ${selectClass}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
