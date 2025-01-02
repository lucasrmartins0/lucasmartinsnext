import Image from 'next/image';

// Ajuste a interface para receber a função addItemToCart
interface CardProps {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;

  // Nova prop:
  addItemToCart: (product: {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
    rating: number;
    ratingCount: number;
  }) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  price,
  description,
  category,
  imageUrl,
  rating,
  ratingCount,
  addItemToCart,
}) => {
  const handleAddToCart = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      imageUrl,
      rating,
      ratingCount,
    };
    addItemToCart(product);
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white">
      <Image
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={title}
        width={500}
        height={300}
        layout="responsive"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <p className="text-sm text-gray-500 mt-2">
          <strong>Categoria:</strong> {category}
        </p>

        <p className="text-sm text-yellow-500 mt-2">
          <strong>Avaliação:</strong> {rating} ⭐ (Baseado em {ratingCount} avaliações)
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            $ {price.toFixed(2)}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleAddToCart}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
