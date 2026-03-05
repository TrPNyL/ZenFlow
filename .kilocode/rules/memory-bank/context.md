# Active Context: ZenFlow Wellness Platform

## Current State

**Project Status**: ✅ Supabase Database Setup Complete

The ZenFlow wellness platform now has a complete Supabase backend with:
- 7 database tables with proper relationships
- Row Level Security (RLS) policies configured
- Type-safe Supabase client library
- Comprehensive seed data (4 practitioners, 12 services, 30 days availability)

## Recently Completed

- [x] Install Supabase dependencies (@supabase/supabase-js, @supabase/ssr)
- [x] Create SQL schema for all 7 tables (practitioners, services, availability_slots, bookings, wellness_plans, client_progress, reviews)
- [x] Set up RLS policies for each table
- [x] Create /lib/supabase.ts with server, client, and admin instances
- [x] Add TypeScript type definitions for all tables
- [x] Create database helper functions (getPractitioners, getServices, etc.)
- [x] Create comprehensive seed data SQL
- [x] Update memory bank documentation

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout | ✅ Ready |
| `src/app/globals.css` | Global styles | ✅ Ready |
| `src/lib/supabase.ts` | Supabase clients & types | ✅ Complete |
| `supabase/schema.sql` | Database schema + RLS | ✅ Complete |
| `supabase/seed.sql` | Sample data | ✅ Complete |
| `.kilocode/rules/memory-bank/` | AI context | ✅ Updated |

## Database Tables

1. **practitioners** - Wellness professionals with specialties, experience, ratings
2. **services** - Offered services with pricing, duration, categories
3. **availability_slots** - Bookable time slots linked to practitioners
4. **bookings** - Client appointments with status tracking
5. **wellness_plans** - Personalized wellness plans with AI-generated content
6. **client_progress** - Daily wellness tracking (mood, energy, stress scores)
7. **reviews** - Client feedback and ratings

## RLS Policies Summary

- **Public read**: Practitioners, Services, Availability Slots, Reviews
- **Authenticated read/write**: Users own their Bookings, Wellness Plans, Client Progress
- **Authenticated insert/update**: Practitioners, Services, Availability Slots (for admin/owner use)

## Seed Data

4 Practitioners:
1. Sarah Chen - Massage Therapy (12 years)
2. Michael Rivers - Yoga & Mindfulness (8 years)
3. Dr. Emily Watson - Life Coaching (15 years)
4. James Okonkwo - Nutrition Counseling (10 years)

Each with 3 services, 30 days of weekday availability slots, and sample reviews.

## Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # Optional, for admin operations
```

## Next Steps

1. Create Supabase project and run schema.sql
2. Run seed.sql to populate data
3. Set up environment variables in .env.local
4. Build frontend components (practitioner cards, booking flow, etc.)
5. Implement authentication if needed

## Quick Reference

### Run in Supabase SQL Editor:
1. Copy contents of `supabase/schema.sql`
2. Copy contents of `supabase/seed.sql`

### Use in Components:
```tsx
// Server Component
import { getPractitioners } from "@/lib/supabase";
const practitioners = await getPractitioners();

// Client Component
import { createClient } from "@/lib/supabase";
const supabase = createClient();
```

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| Current | Supabase database schema, RLS, seed data, and client library added |
