import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { CookieOptions } from "@supabase/ssr";

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Type definitions for database tables
export type Practitioner = {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  photo: string | null;
  specialty: string;
  years_exp: number;
  rating: number;
  certifications: string[];
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  practitioner_id: string;
  name: string;
  description: string | null;
  duration_mins: number;
  price: number;
  category: string;
  image_url: string | null;
  benefits: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AvailabilitySlot = {
  id: string;
  practitioner_id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  client_id: string;
  service_id: string;
  practitioner_id: string;
  slot_id: string | null;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type WellnessPlan = {
  id: string;
  client_id: string;
  goals: string[];
  assessment_json: Record<string, unknown>;
  plan_json: Record<string, unknown>;
  created_by_ai: boolean;
  created_at: string;
  updated_at: string;
};

export type ClientProgress = {
  id: string;
  client_id: string;
  date: string;
  mood_score: number | null;
  energy_score: number | null;
  stress_score: number | null;
  notes: string | null;
  created_at: string;
};

export type Review = {
  id: string;
  client_id: string;
  practitioner_id: string;
  service_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

// ============================================
// BROWSER CLIENT (for Client Components)
// ============================================
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// ============================================
// SERVER CLIENT (for Server Components)
// ============================================
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // Handle case where cookies can't be set (e.g., during SSR)
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch (error) {
          // Handle case where cookies can't be removed (e.g., during SSR)
        }
      },
    },
  });
}

// ============================================
// ADMIN CLIENT (for server-side admin operations)
// Uses service role key - only use in secure server contexts!
// ============================================
export function createAdminClient() {
  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin operations");
  }
  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ============================================
// DATABASE HELPERS
// ============================================

// Practitioners
export async function getPractitioners() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("practitioners")
    .select("*")
    .order("name");
  if (error) throw error;
  return data as Practitioner[];
}

export async function getPractitionerById(id: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("practitioners")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Practitioner;
}

// Services
export async function getServices() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, practitioners(*)")
    .eq("is_active", true)
    .order("name");
  if (error) throw error;
  return data as (Service & { practitioners: Practitioner })[];
}

export async function getServicesByPractitioner(practitionerId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("practitioner_id", practitionerId)
    .eq("is_active", true)
    .order("name");
  if (error) throw error;
  return data as Service[];
}

// Availability Slots
export async function getAvailabilitySlots(practitionerId: string, date?: string) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("availability_slots")
    .select("*")
    .eq("practitioner_id", practitionerId)
    .eq("is_booked", false);
  
  if (date) {
    query = query.eq("date", date);
  }
  
  const { data, error } = await query.order("start_time");
  if (error) throw error;
  return data as AvailabilitySlot[];
}

// Bookings
export async function getClientBookings(clientId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, services(*), practitioners(*)")
    .eq("client_id", clientId)
    .order("date", { ascending: false });
  if (error) throw error;
  return data as (Booking & { services: Service; practitioners: Practitioner })[];
}

// Reviews
export async function getPractitionerReviews(practitionerId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("practitioner_id", practitionerId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Review[];
}

// Wellness Plans
export async function getClientWellnessPlan(clientId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("wellness_plans")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== "PGRST116") throw error;
  return data as WellnessPlan | null;
}

// Client Progress
export async function getClientProgress(clientId: string, limit: number = 30) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("client_progress")
    .select("*")
    .eq("client_id", clientId)
    .order("date", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as ClientProgress[];
}