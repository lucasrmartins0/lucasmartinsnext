import Image from 'next/image';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, price, imageUrl }) => {
  return (
    <div className={`${styles.card} max-w-sm rounded-lg overflow-hidden shadow-md bg-white`}>
      <Image
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={title}
        width={500}
        height={300}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{price}</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
