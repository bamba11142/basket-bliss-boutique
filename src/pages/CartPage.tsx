import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Trash,
  ChevronLeft,
  X,
  Plus,
  Minus,
  ShoppingBag
} from "lucide-react";
import { toast } from "@/lib/toast";

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-jumia-dark mb-8 flex items-center">
          <ShoppingCart className="mr-3" />
          Your Cart
        </h1>
        
        <div className="text-center py-12">
          <div className="inline-flex justify-center items-center rounded-full bg-jumia-light p-6 mb-4">
            <ShoppingBag className="h-12 w-12 text-jumia-orange" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="bg-jumia-orange hover:bg-orange-600">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-jumia-dark mb-4 flex items-center">
        <ShoppingCart className="mr-3" />
        Your Cart
      </h1>
      
      <Link to="/products" className="inline-flex items-center text-jumia-blue hover:underline mb-8">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Continue Shopping
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex flex-col sm:flex-row bg-white rounded-lg shadow overflow-hidden"
            >
              {/* Product Image */}
              <div className="sm:w-32 h-32 flex-shrink-0">
                <Link to={`/products/${item.product.id}`}>
                  <img
                    src={item.product.image || "https://placehold.co/200x200?text=No+Image"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/200x200?text=No+Image";
                    }}
                  />
                </Link>
              </div>
              
              {/* Product Details */}
              <div className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="text-lg font-medium text-jumia-dark hover:text-jumia-blue"
                  >
                    {item.product.name}
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-2">
                  {item.product.description}
                </p>
                
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-3 font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      ${item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="font-semibold text-jumia-dark">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
              onClick={clearCart}
            >
              <Trash className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4 pb-4 border-b">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-jumia-orange">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              className="w-full bg-jumia-orange hover:bg-orange-600"
              size="lg"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              By checking out, you agree to our Terms and Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
