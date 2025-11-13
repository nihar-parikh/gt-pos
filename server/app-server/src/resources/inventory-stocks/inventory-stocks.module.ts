import { Module } from '@nestjs/common';
import { InventoryStocksService } from './inventory-stocks.service';
import { InventoryStocksResolver } from './inventory-stocks.resolver';

@Module({
  providers: [InventoryStocksResolver, InventoryStocksService],
})
export class InventoryStocksModule {}
