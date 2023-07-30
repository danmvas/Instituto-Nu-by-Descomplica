import React, { useState, useEffect } from "react";

// Definindo o tipo dos itens do carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number; // Adicionamos a propriedade "quantity" ao tipo Product
}

interface CartProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <div>
      <h2>Carrinho de Compras:</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - R$ {item.price} x{" "}
            <input
              type="number"
              value={item.quantity}
              min={1}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value, 10))
              }
            />
          </li>
        ))}
      </ul>
      <strong>Total da compra: R$ {getTotal()}</strong>
    </div>
  );
};

export default Cart;
