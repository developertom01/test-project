export class CreatePriceDto {
  value: number;
}

export class CreateProductDto {
  name: string;
  price?: CreatePriceDto | null;
}
