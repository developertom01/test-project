import {
  Allow,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePriceDto {
  value: number;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray({})
  @IsOptional()
  price?: CreatePriceDto | null;
}
