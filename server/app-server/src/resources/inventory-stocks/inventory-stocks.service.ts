import { Injectable } from '@nestjs/common';
import { CreateInventoryStockInput } from './dto/create-inventory-stock.input';
import { UpdateInventoryStockInput } from './dto/update-inventory-stock.input';

@Injectable()
export class InventoryStocksService {
  create(createInventoryStockInput: CreateInventoryStockInput) {
    return 'This action adds a new inventoryStock';
  }

  findAll() {
    return `This action returns all inventoryStocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryStock`;
  }

  update(id: number, updateInventoryStockInput: UpdateInventoryStockInput) {
    return `This action updates a #${id} inventoryStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryStock`;
  }
}
