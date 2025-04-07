
import { toast } from "@/components/ui/sonner";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
}

const API_URL = "http://localhost:3000";

// Function to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to load products");
    return [];
  }
};

// Function to get the 6 latest products for the home page
export const getLatestProducts = async (): Promise<Product[]> => {
  try {
    const products = await getAllProducts();
    return products
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);
  } catch (error) {
    console.error("Error fetching latest products:", error);
    toast.error("Failed to load latest products");
    return [];
  }
};

// Function to get a single product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    toast.error("Failed to load product details");
    return null;
  }
};

// Function to add a new product
export const addProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    
    toast.success("Product added successfully!");
    return response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("Failed to add product");
    return null;
  }
};

// Function to update a product
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    
    toast.success("Product updated successfully!");
    return response.json();
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    toast.error("Failed to update product");
    return null;
  }
};

// Function to delete a product
export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    
    toast.success("Product deleted successfully!");
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    toast.error("Failed to delete product");
    return false;
  }
};
