
# BasketBliss E-commerce Mini Application

A mini e-commerce application that allows users to browse products, view product details, add products to cart, and manage their shopping cart.

## Features

- Browse the 6 latest products on the homepage
- View all products in the products page
- Search for products
- View detailed information about each product
- Add new products to the database
- Add products to your shopping cart
- Manage quantities in your cart
- Real-time cart total calculation

## Technologies Used

- React
- TypeScript
- React Router for navigation
- React Query for data fetching
- React Hook Form for form handling
- Zod for form validation
- Tailwind CSS for styling
- Shadcn UI components
- JSON Server for the backend API

## Setup Instructions

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the JSON Server (database):

```bash
npx json-server --watch db.json --port 3000
```

4. In a new terminal, start the React application:

```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser to view the application

## API Endpoints

The application uses the following API endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product by ID
- `POST /products` - Add a new product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## Screenshots

[Screenshots would be added here]

## Future Enhancements

- User authentication
- Order history
- Product categories
- Payment processing
- Admin dashboard

