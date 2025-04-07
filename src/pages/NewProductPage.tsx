
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  price: z.coerce
    .number()
    .positive("Price must be a positive number"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const NewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      const newProduct = {
        ...data,
        createdAt: new Date().toISOString(),
        image: data.image || "https://placehold.co/400x400?text=No+Image",
      };
      return addProduct(newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["latestProducts"] });
      toast.success("Product added successfully!");
      navigate("/products");
    },
    onError: () => {
      toast.error("Failed to add product!");
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-jumia-dark mb-8">
        Add New Product
      </h1>

      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-6 rounded-lg shadow"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter product name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      placeholder="0.00" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description" 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com/image.jpg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500">
                    Leave blank to use a placeholder image
                  </p>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-jumia-orange hover:bg-orange-600"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProductPage;
