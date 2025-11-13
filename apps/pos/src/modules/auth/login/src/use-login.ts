// hooks/use-login.ts
import eventBus from '@gtpos/core/event-bus';
import { usePowerSync } from '@powersync/react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from './zustand-store/use-login.store';

export const useLogin = () => {
  const navigate = useNavigate();

  const powerSync = usePowerSync();
  const login = useLoginStore((s) => s.login);
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const token = 'abc123';
    const user = values.username;
    login(token, user);
    localStorage.setItem('token', token);

    //START: Create list query for dev server testing, remove this once done
    const LISTS_TABLE = 'lists';

    // await db.insert(lists).values([{ id: uuid().toString(), created_at: new Date().toISOString(), name: 'test abc', owner_id: 'owner-123' }]);
    // const result = await db.select().from(lists);

    const res = await powerSync.execute(
      `INSERT INTO ${LISTS_TABLE} (id, created_at, name, owner_id) VALUES (uuid(), datetime(), ?, ?) RETURNING *`,
      ['test-ghi', '6e4db842-2d6b-464a-bb3b-5ec69c623a19']
    );

    console.log('Inserted record result:', res);
    //END: Create list query for dev server testing

    navigate('/inventory');
    localStorage.setItem('token', 'abc123');

    eventBus.emit('toast', 'Item added successfully!');
  };
  return { handleSubmit };
};
