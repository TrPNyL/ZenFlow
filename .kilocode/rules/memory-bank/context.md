# Active Context: ZenFlow Wellness Platform

## Current State

**Project Status**: ✅ Design System Complete

The ZenFlow wellness platform now has:
- Complete biophilic design system with organic aesthetics
- 4 core UI components with rich interactions
- Full Supabase backend with 7 tables, RLS policies, and seed data

## Recently Completed

- [x] Create biophilic design system (globals.css)
  - CSS variables for sage, cream, forest, blush palette
  - Playfair Display (headings) + Source Sans 3 (body) fonts
  - Breathing, blob morph, water fill animations
- [x] Create ServiceCard component with hover effects and water fill CTA
- [x] Create PractitionerCard with breathing animation and sage ring
- [x] Create BookingCalendar with month transitions and time slot selection
- [x] Create WellnessProgressChart with recharts (area chart, gradient fills, animated draw)
- [x] Install recharts dependency
- [x] Supabase database setup (schema, RLS, seed data, client library)

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page | ✅ Ready |
| `src/app/layout.tsx` | Root layout with fonts | ✅ Ready |
| `src/app/globals.css` | Biophilic design system | ✅ Complete |
| `src/lib/supabase.ts` | Supabase clients & types | ✅ Complete |
| `src/components/ui/ServiceCard.tsx` | Service cards with water fill CTA | ✅ Complete |
| `src/components/ui/PractitionerCard.tsx` | Practitioner cards with breathing hover | ✅ Complete |
| `src/components/ui/BookingCalendar.tsx` | Calendar with month transitions | ✅ Complete |
| `src/components/ui/WellnessProgressChart.tsx` | Progress area chart with recharts | ✅ Complete |
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
| Previous | Supabase database schema, RLS, seed data, and client library added |
| Current | Biophilic design system, 4 UI components (ServiceCard, PractitionerCard, BookingCalendar, WellnessProgressChart), recharts integration |
