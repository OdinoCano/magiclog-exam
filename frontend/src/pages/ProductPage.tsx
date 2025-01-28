import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import api from '../services/api';
import { Product } from '../types/Product';
import { useAlert } from '../components/Alert/AlertContext';
import { AxiosError } from 'axios';

interface ProductPageProps {
  isAuthenticated: boolean; // Prop para verificar si el usuario está autenticado
  userRole: 'seller' | 'admin' | null; // Prop para verificar el rol del usuario
}

const ProductPage: React.FC<ProductPageProps> = ({ isAuthenticated, userRole }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', quantity: 0, price: 0 });
  const { showAlert } = useAlert();
  
  useEffect(() => {
    if (isAuthenticated && userRole === 'seller') {
      api.get('/products').then((response) => setProducts(response.data));
    }
  }, [isAuthenticated, userRole]);

  const handleAddProduct = async () => {
    try {
      const response = await api.post('/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', sku: '', quantity: 0, price: 0 });
    } catch (err) {
      if (err instanceof AxiosError) {
        let errorMessage = err.response?.data?.message 
        || JSON.stringify(err.response?.data) 
        || JSON.stringify(err.request) 
        || err.message;
        showAlert({
          message: errorMessage,
          severity: "error",
          title: "Error",
        });
      }else{
        showAlert({
          message: "Error al agregar producto",
          severity: "error",
          title: "Error",
        });
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Mis Productos</Typography>
      <TextField label="Nombre" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      <TextField label="SKU" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} />
      <TextField label="Cantidad" type="number" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })} />
      <TextField label="Precio" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
      <Button onClick={handleAddProduct}>Agregar Producto</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.sku}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductPage;