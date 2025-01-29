import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { ProductsService } from './services/products.service';
import { beforeEach, describe, it } from 'node:test';
import jest from 'jest-mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              //getMany: jest.fn().mockResolvedValue([]),
            })),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('debería estar definido', () => {
    //expect(service).toBeDefined();
  });

  describe('searchProducts', () => {
    it('debería retornar una lista de productos que coincidan con el nombre', async () => {
      const products = [{ id: 1, name: 'Laptop', sku: 'ABC-123', price: 1500 }] as Product[];
      jest.spyOn(productsRepository, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        //getMany: jest.fn().mockResolvedValue(products),
      } as any);

      const result = await service.searchProducts('Laptop');
      expect(result)//.toEqual(products);
    });
  });
});

function expect(result: void) {
  throw new Error('Function not implemented.');
}
