import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { Product } from '../types/Product';

interface ProductPageProps {
  isAuthenticated: boolean; // Prop para verificar si el usuario está autenticado
  userRole: 'seller' | 'admin' | null; // Prop para verificar el rol del usuario
}

const AdminPage: React.FC<ProductPageProps> = ({ isAuthenticated, userRole }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Lógica para obtener todos los productos
  }, []);

  return (
    <Container>
      <Typography variant="h4">Todos los Productos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Vendedor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{JSON.stringify(product.seller)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminPage;