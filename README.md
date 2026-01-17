# Authentication App

A full-stack Next.js application featuring user authentication with email/password credentials, built with NextAuth.js v5, Prisma ORM, and PostgreSQL.

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.2 (App Router)
- **Language**: TypeScript 5
- **Authentication**: NextAuth.js 5.0.0-beta.30
- **Database**: PostgreSQL with Prisma ORM 7.2.0
- **UI Components**: Radix UI + shadcn/ui (New York style)
- **Styling**: Tailwind CSS 4
- **Form Handling**: React Hook Form 7.71.1 + Zod 4.3.5
- **Password Hashing**: bcrypt 6.0.0
- **Package Manager**: pnpm

## 📁 Project Structure

```
first-one/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with font configuration
│   │   ├── page.tsx                  # Home page (redirects to sign-in)
│   │   ├── login/                    # Login page route
│   │   │   └── page.tsx
│   │   ├── sign-in/                  # Sign-up page route
│   │   │   └── page.tsx
│   │   ├── globals.css               # Global styles
│   │   └── generated/prisma/         # Prisma generated client
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # NextAuth API route handler
│   ├── auth.ts                       # NextAuth configuration
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login-form.tsx        # Login form component
│   │   │   └── sign-in-form.tsx      # Sign-up form component
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client instance
│   │   └── utils.ts                  # Utility functions (cn helper)
│   └── proxy.ts                      # Proxy utility function
├── server/                           # Server actions
│   ├── login-form-action.ts          # Login server action
│   └── sign-form-action.ts           # Sign-up server action
├── schemas/
│   └── form-schema.ts                # Zod validation schemas
├── types/
│   └── next-auth.d.ts                # NextAuth type extensions
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Database migrations
├── components.json                   # shadcn/ui configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
└── prisma.config.ts                  # Prisma configuration
```

## ✨ Features

### Authentication
- **User Registration**: Sign up with name, email, and password
- **User Login**: Authenticate with email and password
- **Session Management**: JWT-based sessions with NextAuth.js
- **Password Security**: bcrypt hashing (10 rounds)
- **Role-Based Access**: User roles (USER, ADMIN) stored in session
- **Form Validation**: Client and server-side validation with Zod

### User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI Components**: shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Transition states during form submission

## 🔐 Authentication System

### NextAuth Configuration

The authentication is configured in `src/auth.ts`:

- **Provider**: Credentials provider for email/password authentication
- **Adapter**: Prisma adapter for session management
- **Callbacks**:
  - **JWT Callback**: Adds `id` and `role` to the JWT token
  - **Session Callback**: Exposes `id` and `role` in the session object

### Session Data

After authentication, the session object contains:
- `id`: User ID (string)
- `role`: User role ("USER" or "ADMIN")
- Standard NextAuth session properties (user, expires, etc.)

### Type Extensions

Custom types are defined in `types/next-auth.d.ts`:
```typescript
interface Session {
  id?: string
  role?: string
}

interface JWT {
  id?: string
  role?: string
}
```


### User Roles
- `USER`: Default role for regular users
- `ADMIN`: Administrative role

### Additional Models
- **Account**: OAuth provider accounts (for future OAuth support)
- **Session**: NextAuth session management
- **VerificationToken**: Email verification tokens

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 20+ 
- PostgreSQL database
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository** (if applicable)

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**:
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run migrations
   pnpm prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   pnpm dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_SECRET` | Secret key for JWT encryption | Generate with: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base URL of your application | `http://localhost:3000` |

## 🔄 Development Workflow

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint

### Database Management

```bash
# Create a new migration
pnpm prisma migrate dev --name migration_name

# Reset database (development only)
pnpm prisma migrate reset

# Open Prisma Studio (database GUI)
pnpm prisma studio
```

## 📄 API Routes

### Authentication Endpoint
- **Path**: `/api/auth/[...nextauth]`
- **Methods**: GET, POST
- **Handler**: NextAuth.js dynamic route handler

### Pages
- **`/`**: Home page (redirects to sign-in)
- **`/sign-in`**: User registration page
- **`/login`**: User login page

## 🧩 Key Components

### Authentication Components

#### `LoginForm`
- **Location**: `src/components/auth/login-form.tsx`
- **Purpose**: User login form with email and password fields
- **Validation**: Uses `loginSchema` (email + password)
- **Server Action**: `loginInAction`

#### `SignInForm`
- **Location**: `src/components/auth/sign-in-form.tsx`
- **Purpose**: User registration form with name, email, and password
- **Validation**: Uses `formSchema` (name + email + password)
- **Server Action**: `signInAction`

### Server Actions

#### `loginInAction`
- **Location**: `server/login-form-action.ts`
- **Purpose**: Validates credentials and signs in user via NextAuth
- **Error Handling**: Returns error messages for invalid credentials

#### `signInAction`
- **Location**: `server/sign-form-action.ts`
- **Purpose**: Creates new user account with hashed password
- **Validation**: Checks for existing email addresses
- **Redirect**: Redirects to `/login` after successful registration

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt (10 rounds)
2. **Input Validation**: Both client and server-side validation with Zod
3. **SQL Injection Protection**: Prisma ORM provides parameterized queries
4. **CSRF Protection**: NextAuth.js includes built-in CSRF protection
5. **Session Security**: JWT tokens with secure session management

## 📚 Form Validation Schemas

### Sign-Up Schema (`formSchema`)
- **name**: String, minimum 1 character
- **email**: Valid email format
- **password**: Minimum 8 characters

### Login Schema (`loginSchema`)
- **email**: Valid email format
- **password**: Minimum 8 characters

Both schemas are defined in `schemas/form-schema.ts` using Zod.

## 🎨 Styling

- **CSS Framework**: Tailwind CSS 4
- **UI Library**: shadcn/ui (New York style)
- **Color Scheme**: CSS variables with dark mode support
- **Fonts**: Geist Sans and Geist Mono (Google Fonts)

## 🔧 Configuration Files

- **`components.json`**: shadcn/ui configuration
- **`tsconfig.json`**: TypeScript compiler options with path aliases (`@/*`)
- **`next.config.ts`**: Next.js configuration
- **`prisma.config.ts`**: Prisma CLI configuration
- **`eslint.config.mjs`**: ESLint configuration

## 📦 Dependencies

### Core Dependencies
- `next`: React framework
- `react` & `react-dom`: UI library
- `next-auth`: Authentication library
- `@prisma/client`: Database ORM client
- `bcrypt`: Password hashing
- `zod`: Schema validation
- `react-hook-form`: Form state management

### UI Dependencies
- `@radix-ui/*`: Headless UI primitives
- `tailwindcss`: Utility-first CSS
- `class-variance-authority`: Component variants
- `clsx` & `tailwind-merge`: Class name utilities

## 🚧 Future Enhancements

Potential improvements:
- Email verification system
- OAuth providers (Google, GitHub, etc.)
- Password reset functionality
- Two-factor authentication
- User profile management
- Protected routes and middleware
- Admin dashboard
- Rate limiting for authentication endpoints

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a private project. Contributions are not currently accepted.

---

**Built with ❤️ using Next.js, NextAuth.js, and Prisma**
