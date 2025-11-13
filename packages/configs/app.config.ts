export const MODULES_ENABLED = {
  sales: true,
  inventory: true,
  purchases: false,   // disabled
  loyalty: false,     // disabled
  reports: true,
};
export const MODULES = Object.keys(MODULES_ENABLED).filter(
  (key) => MODULES_ENABLED[key as keyof typeof MODULES_ENABLED]
);