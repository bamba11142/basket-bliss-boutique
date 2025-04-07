
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Loader, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-jumia-dark mb-4">
          All Products
        </h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 animate-spin text-jumia-orange" />
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-500">Failed to load products. Please try again later.</p>
        </div>
      ) : !filteredProducts || filteredProducts.length === 0 ? (
        <div className="text-center p-8 bg-jumia-light rounded-lg">
          {searchTerm ? (
            <p className="text-jumia-dark">No products match your search criteria.</p>
          ) : (
            <p className="text-jumia-dark">No products available yet.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
