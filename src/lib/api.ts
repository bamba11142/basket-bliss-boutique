
import { toast } from "@/lib/toast";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
}

// Mock data to use when API is unavailable
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "Premium wireless headphones with noise cancellation and long battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    createdAt: "2025-03-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Track your fitness, receive notifications, and more with this stylish smart watch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    createdAt: "2025-03-20T14:15:00Z"
  },
  {
    id: 3,
    name: "Portable Speaker",
    price: 79.99,
    description: "Waterproof portable speaker with amazing sound quality for outdoor adventures.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60",
    createdAt: "2025-04-01T09:45:00Z"
  },
  {
    id: 4,
    name: "Smartphone",
    price: 799.99,
    description: "Latest flagship smartphone with high-end camera and powerful processor.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60",
    createdAt: "2025-04-05T16:20:00Z"
  }
];

const API_URL = "http://localhost:3000";
let useLocalMockData = false;

// Function to get all products
export const getAllProducts = async (): Promise<Product[]> => {
  if (useLocalMockData) {
    console.log("Using mock product data");
    return Promise.resolve([...mockProducts]);
  }

  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Using demo data as API is unavailable");
    useLocalMockData = true;
    return [...mockProducts];
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
    return useLocalMockData ? [...mockProducts].slice(0, 6) : [];
  }
};

// Function to get a single product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  if (useLocalMockData) {
    const product = mockProducts.find(p => p.id === id);
    return product ? {...product} : null;
  }
  
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    toast.error("Failed to load product details");
    
    // Fall back to mock data if available
    if (useLocalMockData) {
      const product = mockProducts.find(p => p.id === id);
      return product ? {...product} : null;
    }
    return null;
  }
};

// Function to add a new product
export const addProduct = async (product: Omit<Product, "id">): Promise<Product | null> => {
  if (useLocalMockData) {
    const newProduct = {
      ...product,
      id: mockProducts.length + 1
    };
    mockProducts.push(newProduct);
    toast.success("Product added successfully!");
    return {...newProduct};
  }
  
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
    toast.error("Switched to demo mode");
    useLocalMockData = true;
    
    // Add to mock data in demo mode
    const newProduct = {
      ...product,
      id: mockProducts.length + 1
    };
    mockProducts.push(newProduct);
    return {...newProduct};
  }
};

// Function to update a product
export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product | null> => {
  if (useLocalMockData) {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index >= 0) {
      mockProducts[index] = { ...mockProducts[index], ...product };
      toast.success("Product updated successfully!");
      return {...mockProducts[index]};
    }
    return null;
  }
  
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
  if (useLocalMockData) {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index >= 0) {
      mockProducts.splice(index, 1);
      toast.success("Product deleted successfully!");
      return true;
    }
    return false;
  }
  
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
