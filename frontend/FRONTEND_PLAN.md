# Loan Application Intake Website - Implementation Plan

## Tech Stack

- React 19 + TypeScript
- Vite build tool
- shadcn/ui components
- Tailwind CSS v4
- React Hook Form + Zod validation
- React Router DOM
- Axios for API calls
- React Query for data fetching

## Application Structure

### 1. Landing Page (`/`)

**Components:**

- `LandingHero` - Main hero section with CTA
- `FeatureSection` - Loan types and benefits
- `ProcessSteps` - How the application process works
- `Testimonials` - Customer testimonials
- `Footer` - Contact info and links

**Utils:** None specific

**API:** None required

---

### 2. Loan Application Form (`/apply`)

**Components:**

- `ApplicationWizard` - Main form container
- `PersonalInfoStep` - Personal details form
- `EmploymentInfoStep` - Employment and income details
- `LoanDetailsStep` - Loan amount, purpose, term
- `DocumentUploadStep` - Required document uploads
- `ReviewStep` - Application review before submission
- `ProgressIndicator` - Step progress bar

**Utils:**

- `validationSchemas.ts` - Zod schemas for each step
- `formatCurrency.ts` - Currency formatting
- `fileValidation.ts` - File upload validation

**Types:**

- `ApplicationData` - Complete application interface
- `PersonalInfo`, `EmploymentInfo`, `LoanDetails` interfaces
- `DocumentType` enum

**API Endpoints:**

- `POST /api/applications` - Submit application
- `POST /api/upload` - Upload documents
- `GET /api/loan-types` - Available loan products

---

### 3. Application Status (`/status/:id`)

**Components:**

- `StatusTracker` - Application progress visualization
- `ApplicationSummary` - Submitted application details
- `DocumentStatus` - Document verification status
- `NextSteps` - What happens next
- `ContactSupport` - Support contact info

**Utils:**

- `statusUtils.ts` - Status formatting helpers

**API Endpoints:**

- `GET /api/applications/:id` - Get application details
- `GET /api/applications/:id/status` - Get current status

---

### 4. Login/Registration (`/auth`)

**Components:**

- `AuthForm` - Login/register toggle form
- `LoginForm` - Email/password login
- `RegisterForm` - User registration
- `ForgotPassword` - Password reset

**Utils:**

- `authValidation.ts` - Auth form validation schemas

**API Endpoints:**

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Password reset

---

### 5. User Dashboard (`/dashboard`)

**Components:**

- `DashboardLayout` - Main dashboard layout
- `ApplicationsList` - User's applications
- `QuickActions` - New application, check status
- `AccountSettings` - Profile management

**Utils:** None specific

**API Endpoints:**

- `GET /api/user/applications` - User's applications
- `GET /api/user/profile` - User profile data

---

## Shared Components

### Layout Components

- `Header` - Navigation with logo, menu, auth buttons
- `Sidebar` - Dashboard sidebar navigation (reusing shadcn sidebar)
- `Layout` - Page wrapper with header/footer
- `ProtectedRoute` - Auth guard component

### UI Components

- `LoadingSpinner` - Loading states
- `ErrorBoundary` - Error handling
- `ConfirmDialog` - Confirmation dialogs
- `FileUpload` - Drag-and-drop file upload
- `CurrencyInput` - Formatted currency input
- `PhoneInput` - Phone number input with validation

## Global Utils & Services

### Utils (`src/utils/`)

- `formatters.ts` - Date, currency, phone formatting
- `validators.ts` - Common validation functions
- `storage.ts` - Local storage helpers
- `constants.ts` - App constants and enums

### Services (`src/services/`)

- `api.ts` - Axios instance and interceptors (already exists)
- `auth.ts` - Auth service methods (already exists)
- `applicationService.ts` - Application-related API calls
- `uploadService.ts` - File upload handling

### Types (`src/types/`)

- `application.ts` - All application-related types
- `user.ts` - User-related types (already exists)
- `api.ts` - API response types (already exists)

### Hooks (`src/hooks/`)

- `useAuth.ts` - Authentication hook
- `useApplication.ts` - Application data hook
- `useFileUpload.ts` - File upload hook
- `use-mobile.ts` - Mobile detection (already exists)

## Routing Structure

```
/ - Landing page
/apply - Multi-step application form
/status/:id - Application status tracking
/auth - Login/registration
/dashboard - User dashboard (protected)
```

## Key Features to Implement

1. Multi-step form with client-side validation
2. File upload with progress tracking
3. Real-time application status updates
4. Responsive design for mobile/desktop
5. Form persistence (local storage)
6. Error handling and loading states
7. Accessibility compliance
8. Basic auth with JWT tokens
