import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import api from '../services/api';
import { Product } from '../types/Product';

interface ProductPageProps {
  isAuthenticated: boolean; // Prop para verificar si el usuario está autenticado
  userRole: 'seller' | 'admin' | null; // Prop para verificar el rol del usuario
}

const AdminPage: React.FC<ProductPageProps> = ({ isAuthenticated, userRole }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [seller, setSeller] = useState('');

  useEffect(() => {
      if (isAuthenticated && userRole === 'admin') {
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

  const handleSearch = async () => {
    try {
      const response = await api.get('/products', {
        params: {
          name: searchTerm,
          sku: searchTerm,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          seller: seller || undefined,
        },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error al buscar productos', err);
    }
  };

  const handleClean = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSeller('');
    fetchProducts();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" fontWeight={600}>
        Todos los Productos
      </Typography>
      
      {/* Barra de búsqueda */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid size={{xs: 12, sm: 4}} component="div">
          <TextField
            fullWidth
            label="Buscar por nombre o SKU"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 4}} component="div">
          <TextField
            fullWidth
            label="Precio mínimo"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 2}} component="div">
          <TextField
            fullWidth
            label="Precio máximo"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 4}} component="div">
          <TextField
            fullWidth
            label="Buscar vendedor por Id o Email"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 2}} component="div">
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            Buscar
          </Button>
        </Grid>
        <Grid size={{xs: 12, sm: 2}} component="div">
          <Button variant="outlined" onClick={handleClean} fullWidth>
            Limpiar
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