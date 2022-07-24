import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Price } from './entities/price.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly dataSource: DataSource,
  ) {}
  public async create(createProductDto: CreateProductDto) {
    let product = this.productRepository.create({
      name: createProductDto.name,
    });
    let price: Price;
    if (createProductDto.price) {
      price = this.priceRepository.create({
        price: createProductDto.price.value,
      });
    }
    product = await this.dataSource.transaction(async (manager) => {
      const createdProduct = await manager.save(product);
      if (price) {
        await manager.save(price);
      }
      return createdProduct;
    });

    product = await this.productRepository.findOne({
      where: { id: product.id },
      relations: { prices: true },
    });
    return product;
  }

  findAll() {
    return this.productRepository.find({ relations: { prices: true } });
  }

  public async findOne(uuid: string) {
    const product = await this.productRepository.findOneBy({
      uuid,
    });
    if (!product) {
      throw new NotFoundException('Unknown product');
    }
    return product;
  }

  public async update(uuid: string, updateProductDto: UpdateProductDto) {
    let product = await this.productRepository.findOneBy({
      uuid,
    });
    if (!product) {
      throw new NotFoundException('Unknown product');
    }
    for (const [k, v] of Object.entries(updateProductDto)) {
      product[k] = v;
    }
    await this.productRepository.save(product);
    product = await this.productRepository.findOne({
      where: { id: product.id },
      relations: { prices: true },
    });
    return product;
  }

  public async remove(uuid: string) {
    let product = await this.productRepository.findOneBy({
      uuid,
    });
    if (!product) {
      throw new NotFoundException('Unknown product');
    }
    await this.productRepository.remove(product);
    return true;
  }
}
