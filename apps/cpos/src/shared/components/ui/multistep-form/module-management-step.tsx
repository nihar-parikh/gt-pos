export type ModuleManagement = {
  inventory: boolean;
  billing: boolean;
  crm: boolean;
  analytics: boolean;
  hr: boolean;
  reports: boolean;
  purchase: boolean;
  sales: boolean;
  support: boolean;
};

export function ModuleManagementStep({
  value,
  onChange,
}: {
  value: ModuleManagement;
  onChange: (next: ModuleManagement) => void;
}) {
  function set<K extends keyof ModuleManagement>(
    key: K,
    v: ModuleManagement[K]
  ) {
    onChange({ ...value, [key]: v });
  }

  const modules = [
    {
      key: 'inventory',
      label: 'Inventory',
      desc: 'Lorem ipsum dolor sit amet consectetur.',
    },
    {
      key: 'billing',
      label: 'Billing',
      desc: 'Create and track invoices easily.',
    },
    { key: 'crm', label: 'CRM', desc: 'Customer management made simple.' },
    {
      key: 'analytics',
      label: 'Analytics',
      desc: 'Get insights and performance reports.',
    },
    { key: 'hr', label: 'HR', desc: 'Employee and attendance management.' },
    {
      key: 'reports',
      label: 'Reports',
      desc: 'Generate and export data reports.',
    },
    {
      key: 'purchase',
      label: 'Purchase',
      desc: 'Manage vendor purchases and orders.',
    },
    { key: 'sales', label: 'Sales', desc: 'Track sales and revenue growth.' },
    {
      key: 'support',
      label: 'Support',
      desc: 'Handle customer queries efficiently.',
    },
  ] as const;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((mod) => (
        <ModuleCard
          key={mod.key}
          label={mod.label}
          desc={mod.desc}
          checked={value[mod.key as keyof ModuleManagement]}
          onChange={(v) => set(mod.key as keyof ModuleManagement, v)}
        />
      ))}
    </div>
  );
}

function ModuleCard({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[16px] border border-[#FFFFFF33] bg-[#EAEAEA] px-6 py-4 h-[135px] shadow-[0_10px_20px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
      <div className="flex items-start gap-3">
        <div className="flex h-[44px] w-[44px] items-center justify-center rounded-md bg-[#EAEAEA]">
          <img src="./token.png" className="h-[50px] w-[60px]" alt="" />
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[#1E1E1E]">{label}</p>
          <p className="text-[13px] text-[#666666]">{desc}</p>
        </div>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="h-[32px] w-[56px] rounded-full bg-[#F3F3F3] shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] transition-all peer-checked:bg-[#00FF0A66] peer-checked:shadow-[inset_2px_2px_5px_#b0c4de,inset_-2px_-2px_5px_#ffffff]" />
        <div className="absolute left-[6px] top-1/2 h-[22px] w-[22px] -translate-y-1/2 rounded-full bg-white shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff] transition-all peer-checked:translate-x-[24px] peer-checked:bg-[#FFFFFF]" />
      </label>
    </div>
  );
}
