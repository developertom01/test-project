import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from 'src/products/entities/price.entity';
import { Product } from 'src/products/entities/product.entity';

export const TypeOrmConfigModule = () =>
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => {
      const env = configService.get<'development' | 'production' | 'test'>(
        'NODE_ENV',
      );

      return {
        type: 'mysql',
        port:
          env === 'test'
            ? configService.get<number>('TEST_DATABASE_PORT')
            : configService.get<number>('DATABASE_PORT'),
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USER'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true,
        password: configService.get<string>('DATABASE_PASSWORD'),
        cache: env === 'production',
        entities: [Product, Price],
        logging: true,
      };
    },
    inject: [ConfigService],
  });
