Gadget Store is a full-stack e-commerce application where users can:

- Browse a catalog of gadgets  
- Add items to cart and checkout  
- View order history  
- (Optional) Admins can manage products  

Features

Product Catalog with search & filter  
Shopping Cart & checkout flow  
Order Management for users  
Payment Integrations: Stripe & PayPal  
Responsive UI built with Tailwind CSS  


Tech Stack

Backend:  
  - Node.js + Express.js  
  - MongoDB (Atlas) + Mongoose
  - JSON Web Tokens for auth 
Frontend:  
  - React + Redux Toolkit + React Router  
  - Axios for HTTP requests  
  - Tailwind CSS for styling  
- Dev Tools: Git, VS Code, Postman  
- Deployment: Heroku (API), Netlify (Client)  

Prerequisites:

- Node.js ≥ v16  
- npm or yarn  
- A MongoDB Atlas URI (or local instance)  
- Stripe & PayPal API keys (for payments)

Installation:

Clone the repository  
   ```bash
   git clone https://github.com/your-username/gadget-store.git
   cd gadget-store
 ```

Folder Structure
gadget-store/
├─ backend/
│  ├─ controllers/      # Business logic
│  ├─ middleware/       # Auth, error handlers
│  ├─ models/           # Mongoose schemas
│  ├─ routes/           # API endpoints
│  └─ server.js
└─ frontend/
   ├─ public/
   └─ src/
      ├─ components/    # Reusable UI components
      ├─ pages/         # Route pages
      ├─ store/         # Redux slices
      ├─ App.jsx
      └─ index.js


Challenges Faced

-MongoDB Connection
Struggled with the connection string and environment variables.
Learned to verify .env paths and enable network access in Atlas.

-npm run dev Issues

Encountered errors when running both servers concurrently.
Fixed by installing nodemon globally and ensuring no port conflicts.

-Page Alignment & Styling

Aligning product cards and grid responsiveness was tricky.
Solved by tweaking Tailwind utility classes and using Flexbox.

-Live Dummy JSON API
Integrating a placeholder API for cart & products (dummyjson) introduced CORS issues.
Resolved by adding CORS middleware and correct request headers.

-Future Improvements

Add user authentication (register/login)
Build an Admin panel for product CRUD
Implement real-time stock updates with Socket.io
and more..
