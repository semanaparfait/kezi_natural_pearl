### 🏗️ Architecture Overview

The application follows a feature-based modular architecture:

- **UI Layer:** Pages and reusable components in `src/pages/` and `src/components/`
- **State Management Layer:** Redux Toolkit for global state
- **API Layer:** Axios for all API calls to the backend
- **Localization Layer:** i18n with support for English, French, and Kinyarwanda
- **Admin Module:** All admin features in `src/owner/`

**Frontend:** React + Vite (deployed on Vercel)
**Backend:** NestJS (deployed on Railway)
**State Management:** Redux Toolkit
**API Communication:** Axios (RESTful)
**Database:** PostgreSQL

---

### 🗄️ Database Structure

**Main Entities:**
- Users
- Products
- Categories
- Orders
- OrderItems
- Events
- Addresses

**Relationships:**
- Product → belongs to Category
- Order → belongs to User
- OrderItem → belongs to Order & Product

**Notes:**
- Orders are stored before payment confirmation.
- PostgreSQL is used for all persistent data.

---

### 📦 Business Rules & Inventory Logic

- Stock decreases only after successful payment (Paypack integration).
- Products with `stock_quantity = 0` are marked as "Out of Stock" and cannot be purchased.
- Low stock threshold triggers a visual warning in the admin dashboard.
- Orders are created in the database before payment confirmation; status is updated after payment.
- Products must belong to a category.

---

### 🔐 Environment Variables

Required environment variables (example):

```
VITE_API_URL=your_backend_api_url
VITE_PAYMENT_KEY=your_paypack_key
VITE_EMAIL_SERVICE_KEY=your_email_service_key
```

Set these in your local `.env` and in Vercel/Railway dashboard for deployment.

---

### 🧑‍💼 Admin Module

Admin users can:
- Create, edit, and delete products
- Manage categories
- View analytics and events
- Update order status
- Manage users

Role-based access control (RBAC) ensures only admins can access admin routes and features. Normal users are restricted from admin actions.

---

### 🔌 API Endpoints (Sample)

```
POST   /auth/login
POST   /auth/register
GET    /products
GET    /products/:id
POST   /orders
GET    /orders/:id
PATCH  /orders/:id/status
```

All endpoints require JWT authentication except for public product and auth routes.

---

### 🚀 Deployment

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Railway
- **Database:** PostgreSQL (managed by Railway)

**Build command:**
```
npm run build
```
**Output directory:**
```
dist/
```

**Environment variables** must be set in Vercel (frontend) and Railway (backend) dashboards.

---

### 🧪 Testing & Quality

- Linting: ESLint with TypeScript rules
- Type checking: TypeScript strict mode
- (Add details here if you have unit/integration tests)

---

### 🔐 Security Considerations

- JWT-based authentication for all protected routes
- Passwords are hashed before storage
- Email verification is required for new users
- Admin routes are protected by RBAC

---

### 🚧 Future Improvements

- Payment gateway expansion (e.g., Stripe, PayPal)
- Product reviews & ratings
- Advanced filtering and search system
- Mobile app version

---
## Kezi Natural Pearl – Commercial Website

Kezi Natural Pearl is a modern, feature-rich commercial website built with React and TypeScript, designed for seamless e-commerce experiences. The project includes user and admin dashboards, product management, authentication, localization, and more.

---

### 🚀 Features

- User authentication (login, register, email verification, password reset)
- Product catalog with categories, product details, and trending items
- Shopping cart and wishlist functionality
- Checkout process with payment integration
- Order management and order history
- User profile and address management
- Community and blog sections
- Contact and newsletter forms
- Admin dashboard for managing products, categories, users, orders, analytics, and events
- Multi-language support (English, French, Kinyarwanda)
- Responsive design and modern UI components

---

### 📁 Folder Structure

```
src/
  App.tsx                # Main app component
  main.tsx               # Entry point
  store.ts               # Redux store setup
  assets/                # Static assets (images, etc.)
  components/            # Reusable UI components
  features/              # Redux slices & API logic (auth, cart, products, etc.)
  hooks/                 # Custom React hooks
  i18n/                  # Localization files
  owner/                 # Admin dashboard and related components
  pages/                 # Main pages (Home, Account, Cart, Shop, etc.)
  services/              # API base configuration
  types/                 # TypeScript type definitions
  Voice/                 # Voice-related features
public/                  # Static public assets
```

---

### 🛠️ Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Kezi_natural_pearl
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

### ⚙️ Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

---

### 🌐 Localization

Localization files are in `src/i18n/locales/` for English (`en`), French (`fr`), and Kinyarwanda (`rw`).

---

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

### 📄 License

This project is licensed. See LICENSE file for details.

---

### 📬 Contact

For questions or support, please contact the project owner or open an issue.
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
