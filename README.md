# BiancoRosso React + WordPress REST API

A modern headless e-commerce jewelry store built with Next.js and WordPress.

## Project Structure

```
BiancoRosso React - Wordpress Rest API/
├── frontend/                  # Next.js React application
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # Reusable React components
│   │   ├── lib/              # Utilities and API client
│   │   ├── store/            # Zustand state management
│   │   └── types/            # TypeScript type definitions
│   └── package.json
└── wordpress-plugins/         # WordPress plugins to upload
    ├── biancorosso-core/     # Product CPT & Taxonomies
    └── biancorosso-commerce/ # Orders & API endpoints
```

## WordPress Backend Setup

### 1. Install Plugins

Upload the two plugin folders to your WordPress installation:

```
wp-content/plugins/biancorosso-core/
wp-content/plugins/biancorosso-commerce/
```

Then activate both plugins in WordPress Admin.

### 2. Plugin Features

**BiancoRosso Core:**
- Registers `product` custom post type
- Adds `material` and `collection` taxonomies
- Exposes custom fields (price, stock_quantity) to REST API

**BiancoRosso Commerce:**
- Creates `wp_biancorosso_orders` database table
- REST API endpoints:
  - `POST /wp-json/biancorosso/v1/order` - Create order
  - `GET /wp-json/biancorosso/v1/order/{id}` - Get order
  - `POST /wp-json/biancorosso/v1/contact` - Contact form

### 3. Add Products

In WordPress Admin:
1. Go to **Products** → **Add New**
2. Add product title, description, and featured image
3. Set custom fields:
   - `price` (e.g., "120.00")
   - `stock_quantity` (e.g., 10)
4. Assign materials and collections
5. Publish

### 4. Configure CORS (if needed)

Add to your `wp-config.php` or use a plugin:

```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
```

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

Create `.env.local` file:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://biancorosso.socratisp.com/wp-json
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## Features

### Frontend
- ✅ Modern React with Next.js 14 App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Zustand for state management
- ✅ Persistent cart (localStorage)
- ✅ Server-side rendering
- ✅ Responsive design

### Pages
- Home (Hero + Featured Products)
- Shop (All Products)
- Product Detail
- Cart
- Checkout
- Thank You
- Order Tracking
- About
- Contact

### Backend (WordPress)
- ✅ Custom Product Post Type
- ✅ REST API endpoints
- ✅ Custom database tables for orders
- ✅ Material & Collection taxonomies

## Deployment

### Frontend Options

**Vercel (Recommended):**
```bash
npm run build
# Deploy to Vercel
```

**Netlify:**
```bash
npm run build
# Deploy build output
```

**Static Export (Hostinger):**
```bash
# Modify next.config.js:
# output: 'export'
npm run build
# Upload 'out' folder to hosting
```

### WordPress Backend

Already hosted at `biancorosso.socratisp.com` via Hostinger.

## API Endpoints

### WordPress REST API

**Products:**
- `GET /wp-json/wp/v2/product` - List all products
- `GET /wp-json/wp/v2/product?slug={slug}` - Get single product

**Orders:**
- `POST /wp-json/biancorosso/v1/order` - Create order
  ```json
  {
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_address": "123 Main St",
    "total_amount": 250.00,
    "items": [
      { "product_id": 1, "quantity": 2 }
    ]
  }
  ```
- `GET /wp-json/biancorosso/v1/order/{id}` - Track order

**Contact:**
- `POST /wp-json/biancorosso/v1/contact` - Submit contact form

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **State:** Zustand
- **Icons:** Lucide React
- **Backend:** WordPress, PHP, MySQL
- **Hosting:** Hostinger (WordPress), Vercel/Netlify (Frontend)

## Development Notes

- Mock data is used as fallback if API fails
- API URL is configurable via environment variables
- Cart persists to localStorage
- All pages are SEO-optimized with proper metadata

## Next Steps

1. Add authentication for order tracking
2. Implement email notifications
3. Add payment gateway integration
4. Enhance order management in WordPress admin
5. Add product reviews and ratings
