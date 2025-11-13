import { CreateInventoryStockInput } from './create-inventory-stock.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryStockInput extends PartialType(CreateInventoryStockInput) {
  @Field(() => Int)
  id: number;
}
