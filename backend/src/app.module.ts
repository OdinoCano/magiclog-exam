import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { User } from './users/users.entity';
import { Product } from './products/products.entity';
import { Cart } from './cart/cart.entity';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [config],
      envFilePath: enviroments[process.env.NODE_ENV!] || '.env',
    }), // Configuración de variables de entorno
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Cambia esto según tu base de datos
        host: configService.get<string>('config.host'), // Accede a las variables de entorno
        port: configService.get<number>('config.port'),
        username: configService.get<string>('config.username'),
        password: configService.get<string>('config.password'), // Asegúrate de que sea una cadena
        database: configService.get<string>('config.database'),
        entities: [User, Product, Cart],
        synchronize: configService.get<boolean>('config.synchronize'),
      })
    }),
    AuthModule, // Importa AuthModule
    CartModule,
    ProductsModule,
    UsersModule, // Importa UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}