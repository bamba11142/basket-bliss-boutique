
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image || "https://placehold.co/400x400?text=Product+Image"}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image";
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-jumia-dark truncate">{product.name}</h3>
          <p className="text-jumia-orange font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Link to={`/products/${product.id}`} className="text-sm text-jumia-blue hover:underline">
          View details
        </Link>
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="bg-jumia-orange hover:bg-orange-600 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
