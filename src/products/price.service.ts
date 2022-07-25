import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriceDto } from './dto/create-product.dto';
import { Price } from './entities/price.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}
  public async create(productUuid: string, dto: CreatePriceDto) {
    const product = await this.productRepository.findOneBy({
      uuid: productUuid,
    });
    if (!product) {
      throw new NotFoundException('Unknown product');
    }
    let price = this.priceRepository.create({
      productId: product.id,
      price: dto.value,
    });
    return this.priceRepository.save(price);
  }
}
