import clsx from 'clsx';

type ButtonProps = {
  title: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const Button = ({
  title,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'text-white px-4 py-2 rounded transition cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {title}
    </button>
  );
};

export default Button;
