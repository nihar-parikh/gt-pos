export const LoginService = {
  getItems() {
    return [
      { id: 1, name: 'Item Apple', stock: 10 },
      { id: 2, name: 'Item Banana', stock: 5 },
      { id: 3, name: 'Item Cherry', stock: 8 },
      { id: 4, name: 'Item Date', stock: 12 },
      { id: 5, name: 'Item Elderberry', stock: 7 },
      { id: 6, name: 'Item Fig', stock: 6 },
      { id: 7, name: 'Item Grape', stock: 20 },
      { id: 8, name: 'Item Honeydew', stock: 4 },
      { id: 9, name: 'Item Kiwi', stock: 11 },
      { id: 10, name: 'Item Lemon', stock: 9 },
      { id: 11, name: 'Item Mango', stock: 14 },
      { id: 12, name: 'Item Nectarine', stock: 3 },
      { id: 13, name: 'Item Orange', stock: 16 },
      { id: 14, name: 'Item Papaya', stock: 13 },
      { id: 15, name: 'Item Quince', stock: 2 },
    ];
  },

  //bELOW FUNCTION IS JUST IMPLEMENTED AS EXAMPLE IT WILL BE CHANGED WHEN POS LOGIN GETS IMPLEMENTED
  async login(credentials: {
    username: string;
    password: string;
    isAdmin?: boolean;
  }) {
    const getErrorMessage = (err: unknown): string => {
      if (err instanceof Error) return err.message;
      if (typeof err === 'object' && err !== null) {
        const maybe = err as { response?: { errors?: { message?: string }[] } };
        const msg = maybe?.response?.errors?.[0]?.message;
        if (typeof msg === 'string') return msg;
      }
      return 'Login failed';
    };

    try {
      console.log(
        'POS Login called with:',
        credentials.username,
        credentials.password
      );
      // you can return the user data (optional)
      return { accessToken: '', username: '', isAdmin: true };
    } catch (err: unknown) {
      console.error('❌ GraphQL Login Error:', err);
      throw new Error(getErrorMessage(err));
    }
  },
};
