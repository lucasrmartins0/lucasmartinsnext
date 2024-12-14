// components/Products/products.tsx
'use client'; // Necessário para usar useEffect no Next.js App Router
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card'; // Importa o componente Card
import { Product } from '../../models/interfaces'; // Importa a interface Product

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Pega os dados da API interna
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Nossos Produtos</h1>
      {loading ? (
        <div className="text-center text-gray-600">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              title={product.name}
              description={product.description}
              price={`R$ ${product.price.toFixed(2)}`}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
