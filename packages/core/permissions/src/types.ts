export type AppActions = 'create' | 'read' | 'update' | 'delete' | 'view' | 'manage';
 
export type AppModules =
  | 'sales_invoice'
  | 'returns'
  | 'inventory'
  | 'dashboard'
  | 'settings'
  | 'all';
 
export interface RolePermissionDoc {
  _id: string; // e.g. 'role_cashier'
  type: string;
  role: string;
  modules: {
    name: string;
    permissions: string[];
  }[];
}
 