import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import api from '../services/api';
import { Product } from '../types/Product';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
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
          name: searchTerm,
          sku: searchTerm,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
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
    fetchProducts();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center" fontWeight={600}>
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
        <Grid size={{xs: 12, sm: 3}} component="div">
          <TextField
            fullWidth
            label="Precio mínimo"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Grid>
        <Grid size={{xs: 12, sm: 3}} component="div">
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
          <Button variant="outlined" onClick={handleClean} fullWidth>
            Limpiar
          </Button>
        </Grid>
      </Grid>

      {/* Lista de productos */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product?.sku} size={{xs: 12, sm: 6, md:4}} component="div">
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {
              //product?.imageUrl && (
              //  <CardMedia component="img" height="180" image={product.imageUrl} alt={product.name} />
              //)
              }
              <CardContent>
                <Typography variant="h6" fontWeight={600}>{product?.name}</Typography>
                <Typography variant="body2" color="textSecondary">SKU: {product?.sku}</Typography>
                <Typography variant="body1" fontWeight={500}>Cantidad: {product?.quantity}</Typography>
                <Typography variant="body1" fontWeight={500} color="primary">Precio: ${product?.price}</Typography>
                <Typography variant="body2" color="textSecondary">Vendedor: {product?.seller?.email || 'Desconocido'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
