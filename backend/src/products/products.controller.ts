import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  Request,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFiltersDto } from './dto/product-filters.dto';
import { User } from '../users/users.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

interface AuthenticatedRequest extends Request {
  user: User; // Define el tipo del usuario
}

@ApiTags('Products') // Agrupa los endpoints bajo la etiqueta "products"
@ApiBearerAuth('JWT-auth') // Habilita la autenticación JWT en Swagger
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiQuery({ name: 'filters', type: ProductFiltersDto, required: false })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido' })
  findAll(
    @Query() filters: ProductFiltersDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = request.user as User;
    
    if (!user) {
      return this.productsService.findAllPublic(filters);
    }

    if (user.role === 'seller' && filters?.sellerId && filters.sellerId !== user.id) {
      throw new ForbiddenException('No tienes permiso para filtrar por otros vendedores');
    }
    
    return this.productsService.findAll(user, filters);
  }

  @Roles(Role.Seller)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Prohibido (requiere rol de vendedor)' })
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const user = request.user as User; // Extrae el usuario autenticado
    return this.productsService.create(createProductDto, user);
  }
}