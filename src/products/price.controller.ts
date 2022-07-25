import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-product.dto';
import { PriceService } from './price.service';

@Controller('products')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post('/prices/product/:productUUID')
  public create(
    @Param('productUUID', ParseUUIDPipe) productUUID: string,
    @Body() dto: CreatePriceDto,
  ) {
    return this.priceService.create(productUUID, dto);
  }
}
