import React from 'react';
import Image from 'next/image';
import { Product } from '../../models/interfaces';

interface CardProps {
  product: Product;
  addItemToCart: (product: Product) => void;
}

const Card: React.FC<CardProps> = ({ product, addItemToCart }) => {
  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className="border rounded p-4 bg-white">
      <Image
        src={product.imageUrl}
        alt={product.title}
        width={300}
        height={200}
        className="object-cover"
      />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p>{product.price.toFixed(2)} $</p>
      {/* Exibir Rating */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-yellow-500 font-semibold">
          ⭐ {product.rating.rate.toFixed(1)}
        </span>
        <span className="text-sm text-gray-500">
          ({product.rating.count} avaliações)
        </span>
      </div>
      <button
        onClick={handleAddToCart}
        className="px-4 py-2 mt-2 bg-blue-500 text-white rounded"
      >
        Comprar
      </button>
    </div>
  );
};

export default Card;

