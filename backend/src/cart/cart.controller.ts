import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Get,
  } from '@nestjs/common';
  import { CartService } from './cart.service';
  import { User } from '../users/users.entity';
  import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiBody,
  } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
  
  interface AuthenticatedRequest extends Request {
    user: User; // Define el tipo del usuario
  }
  
  @ApiTags('Cart') // Agrupa los endpoints bajo la etiqueta "cart"
  @ApiBearerAuth('JWT-auth') // Habilita la autenticación JWT en Swagger
  @Controller('cart')
  @UseGuards(JwtAuthGuard)
  export class CartController {
    constructor(private readonly cartService: CartService) {}
  
    @Post()
    @ApiOperation({ summary: 'Agregar un producto al carrito' })
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          productId: { type: 'number', example: 1 },
          quantity: { type: 'number', example: 2 },
        },
      },
    })
    @ApiResponse({ status: 201, description: 'Producto agregado al carrito' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async addToCart(
      @Body('productId') productId: number,
      @Body('quantity') quantity: number,
      @Req() request: AuthenticatedRequest,
    ) {
      const user = request.user as User;
      return this.cartService.addToCart(user, productId, quantity);
    }
  
    @Get()
    @ApiOperation({ summary: 'Obtener los productos del carrito' })
    @ApiResponse({ status: 200, description: 'Lista de productos en el carrito' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async getCart(@Req() request: AuthenticatedRequest) {
      const user = request.user as User;
      return this.cartService.getCart(user);
    }
  }