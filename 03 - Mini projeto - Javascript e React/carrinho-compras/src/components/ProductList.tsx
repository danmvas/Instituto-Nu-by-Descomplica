import React from "react";
import { productsData } from "../products";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductListProps {
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToCart }) => {
  return (
    <div>
      <h2>Produtos disponíveis:</h2>
      <ul>
        {productsData.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description} - R${" "}
            {product.price}
            <button onClick={() => addToCart(product)}>
              Adicionar ao carrinho
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
