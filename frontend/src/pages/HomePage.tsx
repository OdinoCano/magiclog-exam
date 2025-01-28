import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import api from '../services/api';
import { Product } from '../types/Product';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Tipar el estado
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    // Cargar todos los productos al inicio
    fetchProducts();
  }, []);

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
          searchTerm,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error al buscar productos', err);
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Bienvenido al Marketplace
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
        <Grid size={{xs: 12, sm: 2}} component="div">
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            Buscar
          </Button>
        </Grid>
        <Grid size={{xs: 12, sm: 2}} component="div">
          <Button variant="outlined" onClick={fetchProducts} fullWidth>
            Limpiar
          </Button>
        </Grid>
      </Grid>

      {/* Lista de productos */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid key={product?.sku} size={{xs: 12, sm: 6, md: 4}} component="div">
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150" // Imagen de ejemplo
                alt={product?.name}
              />
              <CardContent>
                <Typography variant="h6">{product?.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  SKU: {product?.sku}
                </Typography>
                <Typography variant="body1">Cantidad: {product?.quantity}</Typography>
                <Typography variant="body1">Precio: ${product?.price}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Vendedor: {product?.seller?.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;