import { Test, TestingModule } from '@nestjs/testing';
import { InventoryStocksResolver } from './inventory-stocks.resolver';
import { InventoryStocksService } from './inventory-stocks.service';

describe('InventoryStocksResolver', () => {
  let resolver: InventoryStocksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryStocksResolver, InventoryStocksService],
    }).compile();

    resolver = module.get<InventoryStocksResolver>(InventoryStocksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
