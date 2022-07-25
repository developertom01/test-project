import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Price } from './entities/price.entity';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Price])],
  controllers: [ProductsController, PriceController],
  providers: [ProductsService, PriceService],
})
export class ProductsModule {}
