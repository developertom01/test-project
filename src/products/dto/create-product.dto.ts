import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePriceDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  price?: CreatePriceDto | null;
}
