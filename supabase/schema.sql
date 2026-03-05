-- ZenFlow Wellness Platform Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: practitioners
-- ============================================
CREATE TABLE practitioners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    bio TEXT,
    photo TEXT,
    specialty TEXT NOT NULL,
    years_exp INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
    certifications TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE practitioners IS 'Wellness practitioners offering services';

-- ============================================
-- TABLE: services
-- ============================================
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    duration_mins INTEGER NOT NULL CHECK (duration_mins > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    category TEXT NOT NULL,
    image_url TEXT,
    benefits TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE services IS 'Services offered by practitioners';

-- ============================================
-- TABLE: availability_slots
-- ============================================
CREATE TABLE availability_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (end_time > start_time)
);

COMMENT ON TABLE availability_slots IS 'Available time slots for booking';

-- ============================================
-- TABLE: bookings
-- ============================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE RESTRICT,
    slot_id UUID UNIQUE REFERENCES availability_slots(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE bookings IS 'Client bookings for services';

-- ============================================
-- TABLE: wellness_plans
-- ============================================
CREATE TABLE wellness_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL,
    goals TEXT[] DEFAULT '{}',
    assessment_json JSONB DEFAULT '{}',
    plan_json JSONB DEFAULT '{}',
    created_by_ai BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE wellness_plans IS 'Personalized wellness plans for clients';

-- ============================================
-- TABLE: client_progress
-- ============================================
CREATE TABLE client_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
    energy_score INTEGER CHECK (energy_score >= 1 AND energy_score <= 10),
    stress_score INTEGER CHECK (stress_score >= 1 AND stress_score <= 10),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE client_progress IS 'Daily wellness tracking for clients';

-- ============================================
-- TABLE: reviews
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(client_id, service_id)
);

COMMENT ON TABLE reviews IS 'Client reviews for services and practitioners';

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_services_practitioner ON services(practitioner_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_availability_practitioner ON availability_slots(practitioner_id);
CREATE INDEX idx_availability_date ON availability_slots(date);
CREATE INDEX idx_availability_booked ON availability_slots(is_booked);
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_bookings_practitioner ON bookings(practitioner_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_wellness_plans_client ON wellness_plans(client_id);
CREATE INDEX idx_client_progress_client ON client_progress(client_id);
CREATE INDEX idx_client_progress_date ON client_progress(date);
CREATE INDEX idx_reviews_practitioner ON reviews(practitioner_id);
CREATE INDEX idx_reviews_service ON reviews(service_id);

-- ============================================
-- RLS POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wellness_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PRACTITIONERS POLICIES
-- ============================================
-- Everyone can read practitioners
CREATE POLICY "Practitioners are viewable by everyone"
    ON practitioners FOR SELECT
    USING (true);

-- Only authenticated users can insert (for admin purposes)
CREATE POLICY "Authenticated users can insert practitioners"
    ON practitioners FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update practitioners"
    ON practitioners FOR UPDATE
    TO authenticated
    USING (true);

-- ============================================
-- SERVICES POLICIES
-- ============================================
-- Everyone can read services
CREATE POLICY "Services are viewable by everyone"
    ON services FOR SELECT
    USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert services"
    ON services FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update services"
    ON services FOR UPDATE
    TO authenticated
    USING (true);

-- ============================================
-- AVAILABILITY_SLOTS POLICIES
-- ============================================
-- Everyone can read availability slots
CREATE POLICY "Availability slots are viewable by everyone"
    ON availability_slots FOR SELECT
    USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated users can insert availability slots"
    ON availability_slots FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update availability slots"
    ON availability_slots FOR UPDATE
    TO authenticated
    USING (true);

-- ============================================
-- BOOKINGS POLICIES
-- ============================================
-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
    ON bookings FOR SELECT
    TO authenticated
    USING (client_id = auth.uid() OR auth.uid() IN (
        SELECT id FROM practitioners WHERE id = bookings.practitioner_id
    ));

-- Users can insert their own bookings
CREATE POLICY "Users can insert own bookings"
    ON bookings FOR INSERT
    TO authenticated
    WITH CHECK (client_id = auth.uid());

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings"
    ON bookings FOR UPDATE
    TO authenticated
    USING (client_id = auth.uid());

-- ============================================
-- WELLNESS_PLANS POLICIES
-- ============================================
-- Users can view their own wellness plans
CREATE POLICY "Users can view own wellness plans"
    ON wellness_plans FOR SELECT
    TO authenticated
    USING (client_id = auth.uid());

-- Users can insert their own wellness plans
CREATE POLICY "Users can insert own wellness plans"
    ON wellness_plans FOR INSERT
    TO authenticated
    WITH CHECK (client_id = auth.uid());

-- Users can update their own wellness plans
CREATE POLICY "Users can update own wellness plans"
    ON wellness_plans FOR UPDATE
    TO authenticated
    USING (client_id = auth.uid());

-- ============================================
-- CLIENT_PROGRESS POLICIES
-- ============================================
-- Users can view their own progress
CREATE POLICY "Users can view own progress"
    ON client_progress FOR SELECT
    TO authenticated
    USING (client_id = auth.uid());

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress"
    ON client_progress FOR INSERT
    TO authenticated
    WITH CHECK (client_id = auth.uid());

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
    ON client_progress FOR UPDATE
    TO authenticated
    USING (client_id = auth.uid());

-- ============================================
-- REVIEWS POLICIES
-- ============================================
-- Everyone can read reviews
CREATE POLICY "Reviews are viewable by everyone"
    ON reviews FOR SELECT
    USING (true);

-- Users can insert their own reviews
CREATE POLICY "Users can insert own reviews"
    ON reviews FOR INSERT
    TO authenticated
    WITH CHECK (client_id = auth.uid());

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
    ON reviews FOR UPDATE
    TO authenticated
    USING (client_id = auth.uid());

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
    ON reviews FOR DELETE
    TO authenticated
    USING (client_id = auth.uid());

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_practitioners_updated_at BEFORE UPDATE ON practitioners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wellness_plans_updated_at BEFORE UPDATE ON wellness_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();