
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLatestProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Loader } from "lucide-react";

const HomePage: React.FC = () => {
  const { data: latestProducts, isLoading, error } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: getLatestProducts,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-jumia-dark mb-2">
          Bienvenue sur BasketBliss
        </h1>
        <p className="text-gray-600">
          Découvrez nos nouveautés et ajoutez vos favoris au panier !
        </p>
      </header>

      <h2 className="text-2xl font-bold text-jumia-dark border-b pb-2 mb-6">
        Derniers Produits
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 animate-spin text-jumia-orange" />
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-500">Échec du chargement des produits. Veuillez réessayer plus tard.</p>
        </div>
      ) : !latestProducts || latestProducts.length === 0 ? (
        <div className="text-center p-8 bg-jumia-light rounded-lg">
          <p className="text-jumia-dark">Aucun produit disponible pour le moment. Soyez le premier à en ajouter un !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
