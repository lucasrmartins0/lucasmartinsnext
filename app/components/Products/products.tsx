'use client'; 

import React from 'react';
import useSWR from 'swr';
import Card from '../Card/Card';
import { Product } from '../../models/interfaces';

// Função para buscar os dados da API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products = () => {
  // Usa o hook useSWR para buscar os produtos
  const { data: products, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  if (error) return <div className="text-red-600 text-center">Erro ao carregar os produtos.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Produtos</h1>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 w-full max-w-screen-xl">
          {products?.map((product) => (
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
