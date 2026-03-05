# Technical Context: ZenFlow Wellness Platform

## Technology Stack

| Technology   | Version | Purpose                         |
| ------------ | ------- | ------------------------------- |
| Next.js      | 16.x    | React framework with App Router |
| React        | 19.x    | UI library                      |
| TypeScript   | 5.9.x   | Type-safe JavaScript            |
| Tailwind CSS | 4.x     | Utility-first CSS               |
| Bun          | Latest  | Package manager & runtime       |
| Supabase     | 2.x     | Database & Auth                 |

## Database Schema

### Tables

| Table | Description | Key Fields |
|-------|-------------|------------|
| `practitioners` | Wellness professionals | id, name, specialty, years_exp, rating, certifications[] |
| `services` | Offered services | id, practitioner_id, name, duration_mins, price, category |
| `availability_slots` | Bookable time slots | id, practitioner_id, date, start_time, end_time, is_booked |
| `bookings` | Client appointments | id, client_id, service_id, status, notes |
| `wellness_plans` | AI/personalized plans | id, client_id, goals[], assessment_json, plan_json |
| `client_progress` | Daily wellness tracking | id, client_id, mood_score, energy_score, stress_score |
| `reviews` | Client feedback | id, client_id, rating, comment |

### Relationships

```
practitioners (1) ----< (N) services
practitioners (1) ----< (N) availability_slots
practitioners (1) ----< (N) bookings
practitioners (1) ----< (N) reviews
services (1) ----< (N) bookings
services (1) ----< (N) reviews
availability_slots (1) ----< (1) bookings
```

### RLS Policies

- **Public read**: Practitioners, Services, Availability Slots, Reviews (SELECT)
- **Authenticated write**: All tables (INSERT/UPDATE based on ownership)
- **User-owned data**: Bookings, Wellness Plans, Client Progress (user can only access own records)

## Environment Variables

```bash
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # For admin operations only
```

## Project Structure

```
/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── lib/
│   │   └── supabase.ts      # Supabase clients & helpers
│   └── components/          # React components
├── supabase/
│   ├── schema.sql           # Database schema + RLS
│   └── seed.sql             # Sample data
└── ...config files
```

## Supabase Client Usage

### Server Components
```tsx
import { createServerSupabaseClient, getPractitioners } from "@/lib/supabase";

export default async function Page() {
  const practitioners = await getPractitioners();
  return <div>...</div>;
}
```

### Client Components
```tsx
"use client";
import { createClient } from "@/lib/supabase";

export default function Component() {
  const supabase = createClient();
  // use supabase...
}
```

### Admin Operations (Server Only)
```tsx
import { createAdminClient } from "@/lib/supabase";

const admin = createAdminClient();
// Bypass RLS for admin tasks
```

## Seed Data

4 practitioners with 3 services each:

1. **Sarah Chen** - Massage Therapy (12 years)
   - Swedish Relaxation Massage ($95)
   - Deep Tissue Therapeutic ($140)
   - Hot Stone Healing ($125)

2. **Michael Rivers** - Yoga & Mindfulness (8 years)
   - Private Vinyasa Flow ($85)
   - Guided Meditation ($65)
   - Restorative Yoga ($90)

3. **Dr. Emily Watson** - Life Coaching (15 years)
   - Career Transition Coaching ($175)
   - Stress Management ($150)
   - Personal Development ($165)

4. **James Okonkwo** - Nutrition Counseling (10 years)
   - Nutrition Assessment ($130)
   - Plant-Based Program ($110)
   - Sports Performance ($145)

Plus: 30 days of availability slots (weekdays only), sample reviews.

## Development Commands

```bash
bun install        # Install dependencies
bun dev            # Start dev server
bun build          # Production build
bun lint           # Run ESLint
bun typecheck      # TypeScript check
```

## Setup Instructions

1. Create Supabase project at https://supabase.com
2. Copy project URL and anon key to `.env.local`
3. Run `supabase/schema.sql` in Supabase SQL Editor
4. Run `supabase/seed.sql` to populate data
5. Add `SUPABASE_SERVICE_ROLE_KEY` for admin operations (optional)
