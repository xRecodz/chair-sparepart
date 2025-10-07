# Toko Sparepart Kursi - E-Commerce Website

Website e-commerce full-stack untuk toko sparepart kursi (barbershop, sofa, dan kursi kantor) menggunakan Next.js, MongoDB, dan WhatsApp integration.

## Fitur Utama

### Frontend (Public)
- **Home Page**: Hero section dengan daftar produk unggulan
- **Halaman Produk**: Grid lengkap semua produk
- **Halaman Tentang Kami**: Informasi toko dan keunggulan
- **WhatsApp Integration**: 
  - Tombol "Beli Sekarang" pada setiap produk
  - Floating WhatsApp button di kanan bawah
- **Responsive Design**: Mobile-first dengan Tailwind CSS
- **Animasi Hover**: Smooth transitions pada product cards

### Backend (Admin)
- **Admin Login**: Autentikasi dengan JWT
- **Dashboard**: Kelola produk dengan CRUD operations
- **Protected Routes**: Middleware untuk keamanan
- **MongoDB Integration**: Database untuk produk dan admin

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB dengan Mongoose
- **Authentication**: JWT (jose library)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Password Hashing**: bcryptjs

## Setup & Installation

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Environment Variables

Buat file `.env.local` di root project:

\`\`\`env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chair-spareparts?retryWrites=true&w=majority

# WhatsApp Number (format: 628123456789)
NEXT_PUBLIC_WHATSAPP_NUMBER=628123456789

# JWT Secret
JWT_SECRET=your-secret-key-here
\`\`\`

### 3. Seed Database

Jalankan script untuk membuat admin dan produk sample:

\`\`\`bash
# Seed admin user (username: admin, password: admin123)
npm run dev
# Kemudian jalankan script di browser console atau terminal

# Atau jalankan langsung:
node --loader ts-node/esm scripts/seed-admin.ts
node --loader ts-node/esm scripts/seed-products.ts
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Buka [http://localhost:3000](http://localhost:3000)

## Struktur Project

\`\`\`
├── app/
│   ├── page.tsx                 # Home page
│   ├── produk/page.tsx          # Products page
│   ├── tentang/page.tsx         # About page
│   ├── admin/
│   │   ├── page.tsx             # Admin login
│   │   └── dashboard/page.tsx   # Admin dashboard
│   └── api/
│       ├── admin/login/route.ts # Login API
│       └── products/
│           ├── route.ts         # GET all, POST create
│           └── [id]/route.ts    # PUT update, DELETE
├── components/
│   ├── header.tsx               # Navigation header
│   ├── footer.tsx               # Footer
│   ├── product-card.tsx         # Product card component
│   ├── whatsapp-float.tsx       # Floating WhatsApp button
│   └── admin/
│       ├── product-dialog.tsx   # Add/Edit product dialog
│       └── delete-dialog.tsx    # Delete confirmation
├── lib/
│   ├── mongodb.ts               # MongoDB connection
│   ├── auth.ts                  # JWT utilities
│   └── client-auth.ts           # Client-side auth helpers
├── models/
│   ├── Product.ts               # Product schema
│   └── Admin.ts                 # Admin schema
└── scripts/
    ├── seed-admin.ts            # Seed admin user
    └── seed-products.ts         # Seed sample products
\`\`\`

## API Endpoints

### Public
- `GET /api/products` - Get all products

### Admin (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

## Admin Access

**URL**: [http://localhost:3000/admin](http://localhost:3000/admin)

**Default Credentials**:
- Username: `admin`
- Password: `admin123`

## WhatsApp Integration

Setiap produk memiliki tombol "Beli Sekarang" yang akan membuka WhatsApp dengan pesan otomatis:

\`\`\`
Halo Admin, saya tertarik dengan produk [nama produk].
\`\`\`

Floating button di kanan bawah untuk chat langsung dengan admin.

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di Vercel
3. Tambahkan environment variables
4. Deploy

### MongoDB Atlas

1. Buat cluster di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist IP address (0.0.0.0/0 untuk development)
3. Copy connection string ke `MONGODB_URI`

## Customization

### Ganti Nomor WhatsApp

Edit `.env.local`:
\`\`\`env
NEXT_PUBLIC_WHATSAPP_NUMBER=628123456789
\`\`\`

### Ganti Warna Theme

Edit `app/globals.css` untuk mengubah color scheme.

### Tambah Produk

1. Login ke admin dashboard
2. Klik "Tambah Produk"
3. Isi form dan simpan

## License

MIT License - Free to use for personal and commercial projects.
