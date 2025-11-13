import { createContext, useContext } from 'react';
import { AppAbility } from './define-abilities';
 
export const AbilityContext = createContext<AppAbility>(null!);
 
export const useAbility = () => useContext(AbilityContext);