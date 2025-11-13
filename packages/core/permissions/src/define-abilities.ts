import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability';
import { RolePermissionDoc } from './types';

// export type AppAbility = MongoAbility<[AppActions, AppModules]>;
export type AppAbility = MongoAbility<[string, string]>;

export function defineAbilitiesFromPermissions(
  roleDoc: RolePermissionDoc
): AppAbility {
  const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

  roleDoc.modules.forEach((mod) => {
    mod.permissions.forEach((action) => {
      can(action, mod.name);
    });
  });

  return createMongoAbility(rules);
}
