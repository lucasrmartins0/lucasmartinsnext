// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { Product } from '../../models/interfaces';

// const Carrinho: React.FC = () => {
//   const [cart, setCart] = useState<Product[]>([]);

//   // Carregar produtos do localStorage ao montar
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     console.log('Carrinho no localStorage:', storedCart); // Debug
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   // Salvar no localStorage sempre que o carrinho mudar
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Remover item do carrinho
//   const removeFromCart = (productId: string) => {
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart);
//     console.log('Carrinho após remoção:', updatedCart);
//   };

//   // Exemplo de checkout
//   const handleCheckout = () => {
//     alert('Checkout iniciado!');
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center">
//       <h1 className="text-3xl font-bold mt-6">Carrinho</h1>

//       {cart.length === 0 ? (
//         <p className="mt-4">O carrinho está vazio.</p>
//       ) : (
//         <div className="w-full max-w-screen-md mt-4 space-y-4">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="border p-4 bg-white shadow rounded flex items-center gap-4"
//             >
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 width={80}
//                 height={80}
//                 className="object-cover rounded"
//               />
//               <div>
//                 <p className="font-semibold">{item.title}</p>
//                 <p>R$ {item.price.toFixed(2)}</p>
//               </div>

//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="ml-auto px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//               >
//                 Remover do Carrinho
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={handleCheckout}
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Carrinho;

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Product } from '../../models/interfaces';

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  // Carregamos o carrinho do localStorage apenas uma vez
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleCheckout = () => {
    alert('Checkout iniciado!');
  };

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
                src={item.imageUrl}
                alt={item.title}
                width={80}
                height={80}
                className="object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>{item.price.toFixed(2)} $</p>
              </div>
            </div>
          ))}

          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

