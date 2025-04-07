
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Loader, ShoppingCart, ChevronLeft, Minus, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Loader className="h-10 w-10 animate-spin text-jumia-orange" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 text-jumia-blue"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-500">This product could not be found.</p>
          <Button onClick={() => navigate("/products")} className="mt-4">
            Browse all products
          </Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 text-jumia-blue"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg bg-white border shadow">
          <img
            src={product.image || "https://placehold.co/600x600?text=No+Image"}
            alt={product.name}
            className="w-full h-auto object-contain aspect-square"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x600?text=No+Image";
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-jumia-dark mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-jumia-orange mb-4">
            ${product.price.toFixed(2)}
          </p>

          <Card className="p-4 bg-jumia-light mb-6">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </Card>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-16 mx-2 text-center font-medium text-xl">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full bg-jumia-orange hover:bg-orange-600"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
