'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Card from '../Card/Card';
import { Product } from '../../models/interfaces';
import { FaShoppingCart } from 'react-icons/fa';

// Função para buscar os dados da API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products = () => {
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!data) return;
    const newFilteredData = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(newFilteredData);
  }, [search, data]);

  const addItemToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  if (error) {
    return <div className="text-red-600 text-center">Erro ao carregar os produtos.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-screen-xl flex justify-between items-center py-6 px-4">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div className="flex items-center space-x-4">
          <input
            placeholder="Pesquisar"
            className="border-2 p-1 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Carrinho de compras"
          >
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="ml-1 text-sm font-semibold text-blue-600">
                {cart.length}
              </span>
            )}
          </button>
        </div>
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
              addItemToCart={addItemToCart} 
            />
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="w-full max-w-screen-xl px-4 mt-10">
          <h2 className="text-2xl font-bold mb-2">Carrinho</h2>
          <ul className="list-disc list-inside">
            {cart.map((item) => (
              <li key={item.id}>{item.title} - $ {item.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Products;
