function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

type Step = {
  id: number;
  label: string;
};

export function Stepper({
  steps,
  currentStep,
  onStepClick,
}: {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}) {
  return (
    <nav
      aria-label="Progress"
      className="relative w-[100%] bg-[#f5f6f8] shadow-sm rounded-t-[30px]"
    >
      <ol className="flex items-center justify-between h-[100%]">
        {steps.map((step, idx) => {
          const active = idx === currentStep;

          return (
            <li key={step.id} className="flex-1">
              <button
                type="button"
                onClick={onStepClick ? () => onStepClick(idx) : undefined}
                className={cn(
                  'flex items-center justify-center gap-2 w-full rounded-[40px] py-6 px-6 text-sm font-medium transition-all duration-300 my-1',
                  active
                    ? 'bg-[#007bff] text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100'
                )}
              >
                <span
                  className={cn(
                    'grid h-6 w-6 place-items-center rounded-full text-xs font-semibold border',
                    active
                      ? 'bg-white text-[#007bff] border-transparent'
                      : 'bg-[#939393] text-white border-gray-400'
                  )}
                >
                  {step.id}
                </span>
                <span className="text-[22px] font-[400]">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
