'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '../../models/interfaces';

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  // Carregar carrinho do localStorage na montagem
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Remover item do carrinho
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Função que "compra"
  const handleBuy = () => {
    // Se quiser chamar a API tenho de comentar as linhas
    fetch('/api/deisishop/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: cart.map((p) => p.id),
        name: '',
        student: false,
        coupon: '',
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // Se a compra der certo, limpamos o carrinho
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
        setPurchaseSuccess(true);
      })
      .catch(() => {
        console.error('Erro ao comprar');
      });

    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    setPurchaseSuccess(true);
  };

  if (purchaseSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-green-600">
          Compra realizada com sucesso!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">Carrinho</h1>

      {cart.length === 0 ? (
        <p className="mt-4">O carrinho está vazio.</p>
      ) : (
        <div className="w-full max-w-screen-md mt-4 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="border p-4 bg-white shadow rounded flex items-center gap-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>{item.price.toFixed(2)} $</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-auto px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
          <button
            onClick={handleBuy}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Comprar
          </button>
        </div>
      )}
    </div>
  );
}
