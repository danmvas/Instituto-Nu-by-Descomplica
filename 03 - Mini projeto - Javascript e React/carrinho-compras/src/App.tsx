import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { productsData } from "./products";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <ProductList addToCart={addToCart} />
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default App;
