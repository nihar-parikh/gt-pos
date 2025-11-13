import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class InventoryStock {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
