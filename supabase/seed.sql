-- ZenFlow Wellness Platform Seed Data
-- Run this after schema.sql to populate with sample data

-- ============================================
-- PRACTITIONERS
-- ============================================
INSERT INTO practitioners (id, name, email, bio, photo, specialty, years_exp, rating, certifications) VALUES
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Sarah Chen',
  'sarah.chen@zenflow.com',
  'Licensed massage therapist with over a decade of experience in therapeutic and relaxation massage techniques. Specializes in deep tissue, Swedish, and hot stone therapies. Believes in holistic healing and creating customized treatments for each client unique needs.',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
  'Massage Therapy',
  12,
  4.9,
  ARRAY['Licensed Massage Therapist (LMT)', 'Certified Deep Tissue Specialist', 'Hot Stone Therapy Certified', 'Myofascial Release Trained']
),
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Michael Rivers',
  'michael.rivers@zenflow.com',
  'Certified yoga instructor and mindfulness coach with a background in Vinyasa, Hatha, and Restorative yoga styles. Former professional athlete turned wellness advocate. Creates safe, inclusive spaces for practitioners of all levels to explore movement and breathwork.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  'Yoga & Mindfulness',
  8,
  4.8,
  ARRAY['RYT-500 Yoga Alliance', 'Certified Meditation Teacher', 'Trauma-Informed Yoga Certified', 'Breathwork Facilitator']
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Dr. Emily Watson',
  'emily.watson@zenflow.com',
  'Licensed clinical psychologist and certified life coach specializing in stress management, career transitions, and personal development. PhD in Psychology from Stanford. Combines evidence-based therapeutic approaches with practical coaching techniques to help clients achieve meaningful life changes.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  'Life Coaching',
  15,
  5.0,
  ARRAY['PhD Clinical Psychology', 'ICF Certified Professional Coach', 'Certified Stress Management Consultant', 'Mindfulness-Based Stress Reduction (MBSR) Certified']
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'James Okonkwo',
  'james.okonkwo@zenflow.com',
  'Registered Dietitian Nutritionist (RDN) and certified holistic health coach. Specializes in plant-based nutrition, sports nutrition, and digestive health. Former chef who brings culinary expertise to nutrition counseling. Passionate about making healthy eating accessible and enjoyable.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  'Nutrition Counseling',
  10,
  4.7,
  ARRAY['Registered Dietitian Nutritionist (RDN)', 'Certified Holistic Health Coach', 'Plant-Based Nutrition Certificate', 'Sports Nutrition Specialist']
);

-- ============================================
-- SERVICES - Massage Therapy (Sarah Chen)
-- ============================================
INSERT INTO services (id, practitioner_id, name, description, duration_mins, price, category, image_url, benefits, is_active) VALUES
(
  '660e8400-e29b-41d4-a716-446655440000',
  '550e8400-e29b-41d4-a716-446655440000',
  'Swedish Relaxation Massage',
  'A gentle, full-body massage designed to promote relaxation, improve circulation, and relieve muscle tension. Using long, flowing strokes and light to medium pressure, this classic massage technique helps reduce stress and induce a state of deep calm. Perfect for first-time massage clients or anyone seeking pure relaxation.',
  60,
  95.00,
  'Massage Therapy',
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&h=400&fit=crop',
  ARRAY['Reduces stress and anxiety', 'Improves blood circulation', 'Relieves muscle tension', 'Promotes better sleep', 'Enhances overall well-being'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'Deep Tissue Therapeutic Massage',
  'Targeted therapy focusing on chronic muscle tension, knots, and areas of pain. Using firm pressure and slow strokes, this treatment reaches deeper layers of muscle and connective tissue. Ideal for athletes, those with chronic pain, or anyone with specific areas of tension requiring focused attention.',
  90,
  140.00,
  'Massage Therapy',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop',
  ARRAY['Relieves chronic muscle pain', 'Breaks down scar tissue', 'Improves range of motion', 'Reduces inflammation', 'Addresses postural problems'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440000',
  'Hot Stone Healing Session',
  'A luxurious treatment combining heated basalt stones with traditional massage techniques. The warmth from the stones penetrates deep into muscles, promoting profound relaxation and easing tension. Cold stones may also be used to reduce inflammation and invigorate the body.',
  75,
  125.00,
  'Massage Therapy',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
  ARRAY['Deep muscle relaxation', 'Improves energy flow', 'Reduces stress hormones', 'Relieves pain naturally', 'Promotes mental clarity'],
  true
);

-- ============================================
-- SERVICES - Yoga & Mindfulness (Michael Rivers)
-- ============================================
INSERT INTO services (id, practitioner_id, name, description, duration_mins, price, category, image_url, benefits, is_active) VALUES
(
  '660e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440001',
  'Private Vinyasa Flow Session',
  'A personalized one-on-one yoga session tailored to your experience level and goals. This dynamic practice links breath with movement in a flowing sequence that builds strength, flexibility, and mindfulness. Suitable for all levels, from complete beginners to advanced practitioners.',
  60,
  85.00,
  'Yoga & Mindfulness',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
  ARRAY['Builds strength and flexibility', 'Improves breath awareness', 'Reduces stress', 'Increases energy levels', 'Enhances mind-body connection'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440001',
  'Guided Meditation & Breathwork',
  'A deeply relaxing session focused on mindfulness meditation and conscious breathing techniques. Learn practical tools to manage stress, anxiety, and cultivate inner peace. Includes guided visualization, breathwork exercises, and techniques you can use daily.',
  45,
  65.00,
  'Yoga & Mindfulness',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
  ARRAY['Reduces anxiety and stress', 'Improves focus and clarity', 'Lowers blood pressure', 'Promotes emotional balance', 'Better sleep quality'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440005',
  '550e8400-e29b-41d4-a716-446655440001',
  'Restorative Yoga Therapy',
  'A gentle, therapeutic practice using props to support the body in restful poses held for extended periods. This deeply calming session activates the parasympathetic nervous system, promoting healing and restoration. Perfect for stress relief, recovery, or anyone seeking deep relaxation.',
  75,
  90.00,
  'Yoga & Mindfulness',
  'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&h=400&fit=crop',
  ARRAY['Deep relaxation and restoration', 'Calms nervous system', 'Improves flexibility safely', 'Reduces chronic stress', 'Supports healing processes'],
  true
);

-- ============================================
-- SERVICES - Life Coaching (Dr. Emily Watson)
-- ============================================
INSERT INTO services (id, practitioner_id, name, description, duration_mins, price, category, image_url, benefits, is_active) VALUES
(
  '660e8400-e29b-41d4-a716-446655440006',
  '550e8400-e29b-41d4-a716-446655440002',
  'Career Transition Coaching',
  'Navigate career changes with clarity and confidence. This comprehensive coaching package helps you identify your strengths, explore options, and create an actionable plan for your professional future. Includes assessment tools, resume review, interview preparation, and ongoing support.',
  90,
  175.00,
  'Life Coaching',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
  ARRAY['Gain career clarity', 'Develop actionable plans', 'Build confidence', 'Improve decision-making', 'Achieve work-life balance'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440007',
  '550e8400-e29b-41d4-a716-446655440002',
  'Stress Management Intensive',
  'A focused session addressing burnout, overwhelm, and stress-related challenges. Learn evidence-based techniques to manage stress, set healthy boundaries, and build resilience. Includes personalized stress assessment and a customized wellness plan.',
  60,
  150.00,
  'Life Coaching',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  ARRAY['Reduce stress levels', 'Build emotional resilience', 'Learn coping strategies', 'Improve relationships', 'Enhance overall well-being'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440008',
  '550e8400-e29b-41d4-a716-446655440002',
  'Personal Development Journey',
  'An in-depth coaching program for those seeking profound personal growth. Explore your values, identify limiting beliefs, and create a life aligned with your authentic self. Combines therapeutic insights with practical coaching for lasting transformation.',
  75,
  165.00,
  'Life Coaching',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop',
  ARRAY['Discover authentic self', 'Overcome limiting beliefs', 'Set meaningful goals', 'Improve self-confidence', 'Create lasting change'],
  true
);

-- ============================================
-- SERVICES - Nutrition Counseling (James Okonkwo)
-- ============================================
INSERT INTO services (id, practitioner_id, name, description, duration_mins, price, category, image_url, benefits, is_active) VALUES
(
  '660e8400-e29b-41d4-a716-446655440009',
  '550e8400-e29b-41d4-a716-446655440003',
  'Comprehensive Nutrition Assessment',
  'A thorough evaluation of your current eating habits, health history, and wellness goals. Includes body composition analysis, dietary review, and personalized recommendations. Walk away with a customized nutrition plan tailored to your lifestyle and preferences.',
  90,
  130.00,
  'Nutrition Counseling',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
  ARRAY['Personalized nutrition plan', 'Body composition analysis', 'Dietary optimization', 'Lifestyle integration', 'Long-term health improvement'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440010',
  '550e8400-e29b-41d4-a716-446655440003',
  'Plant-Based Transition Program',
  'Expert guidance for those wanting to adopt or optimize a plant-based diet. Learn how to meet all your nutritional needs while enjoying delicious, satisfying meals. Includes meal planning, recipes, shopping guides, and ongoing support for a smooth transition.',
  60,
  110.00,
  'Nutrition Counseling',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
  ARRAY['Balanced plant-based nutrition', 'Meal planning guidance', 'Recipe collection', 'Shopping strategies', 'Sustainable eating habits'],
  true
),
(
  '660e8400-e29b-41d4-a716-446655440011',
  '550e8400-e29b-41d4-a716-446655440003',
  'Sports Performance Nutrition',
  'Optimize your athletic performance through targeted nutrition strategies. Whether you are training for a marathon, building muscle, or improving endurance, this session provides evidence-based recommendations for fueling your body before, during, and after exercise.',
  75,
  145.00,
  'Nutrition Counseling',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
  ARRAY['Enhanced athletic performance', 'Optimized recovery', 'Energy level improvement', 'Body composition goals', 'Race/event preparation'],
  true
);

-- ============================================
-- AVAILABILITY SLOTS (30 days of slots for each practitioner)
-- ============================================

-- Generate availability slots for the next 30 days
-- Each practitioner has slots at different times

-- Sarah Chen (Massage) - Slots: 9:00 AM, 11:00 AM, 2:00 PM, 4:00 PM
INSERT INTO availability_slots (practitioner_id, date, start_time, end_time, is_booked)
SELECT 
  '550e8400-e29b-41d4-a716-446655440000'::UUID,
  (CURRENT_DATE + (n || ' days')::INTERVAL)::DATE,
  start_time,
  end_time,
  false
FROM generate_series(0, 29) AS n
CROSS JOIN (
  VALUES 
    ('09:00'::TIME, '10:00'::TIME),
    ('11:00'::TIME, '12:00'::TIME),
    ('14:00'::TIME, '15:00'::TIME),
    ('16:00'::TIME, '17:00'::TIME)
) AS times(start_time, end_time)
WHERE EXTRACT(DOW FROM (CURRENT_DATE + (n || ' days')::INTERVAL)) NOT IN (0, 6); -- Exclude weekends

-- Michael Rivers (Yoga) - Slots: 8:00 AM, 10:00 AM, 5:00 PM, 7:00 PM
INSERT INTO availability_slots (practitioner_id, date, start_time, end_time, is_booked)
SELECT 
  '550e8400-e29b-41d4-a716-446655440001'::UUID,
  (CURRENT_DATE + (n || ' days')::INTERVAL)::DATE,
  start_time,
  end_time,
  false
FROM generate_series(0, 29) AS n
CROSS JOIN (
  VALUES 
    ('08:00'::TIME, '09:00'::TIME),
    ('10:00'::TIME, '11:00'::TIME),
    ('17:00'::TIME, '18:00'::TIME),
    ('19:00'::TIME, '20:00'::TIME)
) AS times(start_time, end_time)
WHERE EXTRACT(DOW FROM (CURRENT_DATE + (n || ' days')::INTERVAL)) NOT IN (0, 6);

-- Dr. Emily Watson (Life Coaching) - Slots: 10:00 AM, 1:00 PM, 3:00 PM
INSERT INTO availability_slots (practitioner_id, date, start_time, end_time, is_booked)
SELECT 
  '550e8400-e29b-41d4-a716-446655440002'::UUID,
  (CURRENT_DATE + (n || ' days')::INTERVAL)::DATE,
  start_time,
  end_time,
  false
FROM generate_series(0, 29) AS n
CROSS JOIN (
  VALUES 
    ('10:00'::TIME, '11:30'::TIME),
    ('13:00'::TIME, '14:30'::TIME),
    ('15:00'::TIME, '16:30'::TIME)
) AS times(start_time, end_time)
WHERE EXTRACT(DOW FROM (CURRENT_DATE + (n || ' days')::INTERVAL)) NOT IN (0, 6);

-- James Okonkwo (Nutrition) - Slots: 9:00 AM, 11:00 AM, 2:00 PM, 4:00 PM
INSERT INTO availability_slots (practitioner_id, date, start_time, end_time, is_booked)
SELECT 
  '550e8400-e29b-41d4-a716-446655440003'::UUID,
  (CURRENT_DATE + (n || ' days')::INTERVAL)::DATE,
  start_time,
  end_time,
  false
FROM generate_series(0, 29) AS n
CROSS JOIN (
  VALUES 
    ('09:00'::TIME, '10:30'::TIME),
    ('11:00'::TIME, '12:30'::TIME),
    ('14:00'::TIME, '15:30'::TIME),
    ('16:00'::TIME, '17:30'::TIME)
) AS times(start_time, end_time)
WHERE EXTRACT(DOW FROM (CURRENT_DATE + (n || ' days')::INTERVAL)) NOT IN (0, 6);

-- ============================================
-- SAMPLE REVIEWS
-- ============================================
INSERT INTO reviews (client_id, practitioner_id, service_id, rating, comment) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  '550e8400-e29b-41d4-a716-446655440000',
  '660e8400-e29b-41d4-a716-446655440000',
  5,
  'Sarah was absolutely amazing! The Swedish massage was incredibly relaxing and she really listened to my concerns about my shoulder tension. I left feeling like a new person. Already booked my next session!'
),
(
  '00000000-0000-0000-0000-000000000002',
  '550e8400-e29b-41d4-a716-446655440000',
  '660e8400-e29b-41d4-a716-446655440001',
  5,
  'As an athlete, I have had many deep tissue massages, but Sarah is on another level. She found knots I did not even know I had. My mobility has improved significantly after just two sessions.'
),
(
  '00000000-0000-0000-0000-000000000003',
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440003',
  5,
  'Michael has a gift for teaching. I was nervous about private yoga since I am a beginner, but he made me feel so comfortable. His guidance on alignment was incredibly helpful. I am seeing progress already!'
),
(
  '00000000-0000-0000-0000-000000000004',
  '550e8400-e29b-41d4-a716-446655440001',
  '660e8400-e29b-41d4-a716-446655440005',
  4,
  'The restorative yoga session was exactly what I needed after a stressful month. Michael creates such a peaceful environment. I felt completely renewed afterward. Highly recommend for anyone dealing with burnout.'
),
(
  '00000000-0000-0000-0000-000000000005',
  '550e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440006',
  5,
  'Dr. Watson helped me navigate a major career transition with so much clarity and confidence. Her approach is both compassionate and practical. I landed my dream job thanks to her guidance!'
),
(
  '00000000-0000-0000-0000-000000000006',
  '550e8400-e29b-41d4-a716-446655440002',
  '660e8400-e29b-41d4-a716-446655440007',
  5,
  'I was on the verge of burnout and did not know what to do. Dr. Watson stress management program gave me tools I use every day. My anxiety has decreased significantly and I feel much more in control.'
),
(
  '00000000-0000-0000-0000-000000000007',
  '550e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440009',
  5,
  'James completely changed my relationship with food. His approach is so practical and non-judgmental. I have lost 15 pounds but more importantly, I feel energized and healthy. The meal plans are delicious!'
),
(
  '00000000-0000-0000-0000-000000000008',
  '550e8400-e29b-41d4-a716-446655440003',
  '660e8400-e29b-41d4-a716-446655440011',
  4,
  'As a marathon runner, nutrition is crucial. James helped me optimize my fueling strategy and I have noticed significant improvements in my training. PRd my last race!'
);

-- Update practitioner ratings based on reviews
UPDATE practitioners 
SET rating = (
  SELECT ROUND(AVG(rating)::NUMERIC, 1) 
  FROM reviews 
  WHERE practitioner_id = practitioners.id
)
WHERE id IN (
  SELECT DISTINCT practitioner_id FROM reviews
);