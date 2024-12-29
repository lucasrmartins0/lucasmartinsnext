'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Card from '../Card/Card';
import { Product } from '../../models/interfaces';

// Função para buscar os dados da API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products = () => {
  // 1. Buscar os produtos via SWR
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  // 2. Criar estado para controlar o texto da pesquisa
  const [search, setSearch] = useState('');

  // 3. Criar estado para armazenar produtos filtrados
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  // 4. useEffect para filtrar produtos sempre que 'search' ou 'data' mudarem
  useEffect(() => {
    if (!data) return; // Se ainda não temos data, não faz nada

    const newFilteredData = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(newFilteredData);
  }, [search, data]);

  if (error) {
    return <div className="text-red-600 text-center">Erro ao carregar os produtos.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex justify-between items-center py-6 px-4">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <input
          placeholder="Pesquisar"
          className="border-2 p-1 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-screen-xl px-4 pb-6">
          {filteredData.map((product) => (
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
