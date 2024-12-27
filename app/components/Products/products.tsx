'use client';

import React from 'react';
import useSWR from 'swr';
import Card from '../Card/Card';
import { Product } from '../../models/interfaces';

// Importar os dados da API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products = () => {
  // useSWR para importar os produtos
  const { data: products, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  if (error) return <div className="text-red-600 text-center">Erro ao carregar os produtos.</div>;

  return (
    <div className="w-[90vw] h-[90vh] mx-auto flex flex-col bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Produtos</h1>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-full overflow-y-auto">
          {products?.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category.name}
              imageUrl={product.image}
              rating={product.rating.rate}
              ratingCount={product.rating.count}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
