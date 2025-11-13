export const InventoryService = {
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
  async createInvoice(invoice: unknown) {
    console.log('Creating invoice in POS:', invoice);
    return;
  },
};
