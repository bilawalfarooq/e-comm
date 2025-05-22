# ShopEase – E-Commerce Frontend

ShopEase is a frontend-only e-commerce web application built with React.js and plain CSS. It integrates with the DummyJSON API to display product listings dynamically. Users can browse products, view product details, and manage a shopping cart.

## Features
- Product listing with images, title, price, and Add to Cart
- Product detail page with full info
- Shopping cart with quantity management and total calculation
- Responsive design (CSS Grid/Flexbox, media queries)
- React Router navigation
- State management via Context API

## Tech Stack
- React.js
- Plain CSS
- React Router
- Context API
- DummyJSON API

## Getting Started
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the development server:
   ```powershell
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure
```
/src
  components/
    Navbar.jsx
    ProductCard.jsx
    CartItem.jsx
  pages/
    Home.jsx
    ProductDetail.jsx
    Cart.jsx
  context/
    CartContext.jsx
  styles/
    App.css
  App.jsx
  main.jsx
```

## API Reference
- [DummyJSON Products](https://dummyjson.com/products)

## Future Enhancements
- Search and filter
- Wishlist
- Checkout form (non-functional)

---

© 2025 ShopEase
