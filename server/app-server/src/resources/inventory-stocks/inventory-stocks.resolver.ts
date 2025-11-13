import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InventoryStocksService } from './inventory-stocks.service';
import { InventoryStock } from './entities/inventory-stock.entity';
import { CreateInventoryStockInput } from './dto/create-inventory-stock.input';
import { UpdateInventoryStockInput } from './dto/update-inventory-stock.input';

@Resolver(() => InventoryStock)
export class InventoryStocksResolver {
  constructor(private readonly inventoryStocksService: InventoryStocksService) {}

  @Mutation(() => InventoryStock)
  createInventoryStock(@Args('createInventoryStockInput') createInventoryStockInput: CreateInventoryStockInput) {
    return this.inventoryStocksService.create(createInventoryStockInput);
  }

  @Query(() => [InventoryStock], { name: 'inventoryStocks' })
  findAll() {
    return this.inventoryStocksService.findAll();
  }

  @Query(() => InventoryStock, { name: 'inventoryStock' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inventoryStocksService.findOne(id);
  }

  @Mutation(() => InventoryStock)
  updateInventoryStock(@Args('updateInventoryStockInput') updateInventoryStockInput: UpdateInventoryStockInput) {
    return this.inventoryStocksService.update(updateInventoryStockInput.id, updateInventoryStockInput);
  }

  @Mutation(() => InventoryStock)
  removeInventoryStock(@Args('id', { type: () => Int }) id: number) {
    return this.inventoryStocksService.remove(id);
  }
}
