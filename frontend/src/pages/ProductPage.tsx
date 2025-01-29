import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
      fetchProducts();
    }
  }, [isAuthenticated, userRole]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error al cargar productos', err);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await api.post('/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', sku: '', quantity: 0, price: 0 });
      showAlert({
        message: "Producto agregado correctamente",
        severity: "success",
        title: "Success",
      });
      fetchProducts();
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" fontWeight={600}>
        Mis Productos
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid size={{xs: 12, sm: 4}} component="div">
          <TextField fullWidth label="Nombre" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        </Grid>
        <Grid size={{xs: 12, sm: 4}} component="div">
          <TextField fullWidth label="SKU" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} />
        </Grid>
        <Grid size={{xs: 12, sm: 4}} component="div">
          <TextField fullWidth label="Cantidad" type="number" value={newProduct.quantity} onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })} />
        </Grid>
        <Grid size={{xs: 12, sm: 4}} component="div">
          <TextField fullWidth label="Precio" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
        </Grid>
        <Grid size={{xs: 12, sm: 3}} component="div">
          <Button variant="contained" color="primary" onClick={handleAddProduct} fullWidth>
            Agregar Producto
          </Button>
        </Grid>
      </Grid>
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