import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    return this.productsService.getUserById(id);
  }
}
