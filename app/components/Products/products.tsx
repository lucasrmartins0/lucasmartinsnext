// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import useSWR from 'swr';
// import { Product } from '../../models/interfaces';
// import Card from '../Card/Card';
// import { FaShoppingCart } from 'react-icons/fa';

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// export default function ProductsPage() {
//   const router = useRouter();

//   // Buscar produtos
//   const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

//   // Estados
//   const [search, setSearch] = useState('');
//   const [filteredData, setFilteredData] = useState<Product[]>([]);
//   const [cart, setCart] = useState<Product[]>([]);

//   // Carregar carrinho do localStorage
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   // Salvar no localStorage sempre que cart mudar
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Filtrar produtos
//   useEffect(() => {
//     if (!data) return;
//     const newFilteredData = data.filter((product) =>
//       product.title.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredData(newFilteredData);
//   }, [search, data]);

//   // Adicionar produto ao carrinho
//   const addItemToCart = (product: Product) => {
//     const updatedCart = [...cart, product];
//     setCart(updatedCart); // Atualiza o estado do carrinho
//     localStorage.setItem('cart', JSON.stringify(updatedCart)); // Salva no localStorage imediatamente
//     console.log('Produto adicionado:', product);
//     console.log('Carrinho atualizado:', updatedCart);
//   };

//   if (error) return <div>Erro ao carregar produtos</div>;

//   return (
//     <div className="min-h-screen flex flex-col items-center">
//       <div className="w-full max-w-screen-xl flex justify-between items-center py-6 px-4">
//         <h1 className="text-3xl font-bold">Produtos</h1>
//         <div className="flex items-center space-x-4">
//           <input
//             placeholder="Pesquisar"
//             className="border-2 p-1 rounded"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           {/* Ícone do carrinho */}
//           <button
//             className="text-gray-600 hover:text-gray-800 relative"
//             onClick={() => router.push('/carrinho')}
//           >
//             <FaShoppingCart size={24} />
//             {cart.length > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       {isLoading ? (
//         <div>Carregando...</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-screen-xl px-4 pb-6">
//           {filteredData.map((product) => (
//             <Card
//               key={product.id}
//               product={product}
//               addItemToCart={addItemToCart} // Adiciona ao carrinho
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import Card from '../Card/Card';
import { Product } from '../../models/interfaces';
import { FaShoppingCart } from 'react-icons/fa';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Products = () => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Carregar carrinho do localStorage apenas 1x
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Filtrar produtos
  useEffect(() => {
    if (!data) return;
    const newFilteredData = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(newFilteredData);
  }, [search, data]);

  // Função: adicionar produto ao carrinho (sem redirecionar)
  const addItemToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  if (error) {
    return <div className="text-red-600 text-center">Erro ao carregar os produtos.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Cabeçalho */}
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
            className="text-gray-600 hover:text-gray-800 transition-colors relative"
            aria-label="Carrinho de compras"
            onClick={() => router.push('/carrinho')} // Botão para ir ao carrinho
          >
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
              product={product}
              addItemToCart={addItemToCart} 
            />
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push('/carrinho')}
          >
            Ir para o Carrinho
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
