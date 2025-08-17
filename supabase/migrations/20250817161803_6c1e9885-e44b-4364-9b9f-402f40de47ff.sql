-- Insert demo listings with proper UUIDs
INSERT INTO listings (id, title, description, price, location, image_url, category_id, user_id, is_available) VALUES 
  (gen_random_uuid(), 'Canon EOS R5 DSLR Camera', 'Professional camera perfect for photography and videography. Includes battery and charger.', 45.00, 'Downtown', '/src/assets/camera-rental.jpg', (SELECT id FROM categories WHERE name = 'Photography' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  (gen_random_uuid(), 'DeWalt 20V Power Drill Set', 'Complete power drill set with bits and carrying case. Perfect for home projects.', 25.00, 'Midtown', '/src/assets/drill-rental.jpg', (SELECT id FROM categories WHERE name = 'Tools' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  (gen_random_uuid(), '4-Person Camping Tent', 'Spacious tent perfect for family camping trips. Waterproof and easy to set up.', 35.00, 'Suburbs', '/src/assets/tent-rental.jpg', (SELECT id FROM categories WHERE name = 'Outdoor' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  (gen_random_uuid(), 'MacBook Pro 16-inch', 'High-performance laptop perfect for creative work and presentations.', 65.00, 'University District', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  (gen_random_uuid(), 'Professional Mountain Bike', 'High-quality mountain bike perfect for trail adventures and city commuting.', 40.00, 'Riverside', 'https://images.unsplash.com/photo-1544191696-15693e32c669?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Sports' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  (gen_random_uuid(), 'Portable Generator', 'Reliable backup power solution for outdoor events and emergency situations.', 55.00, 'Industrial District', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Tools' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  (gen_random_uuid(), 'Professional DJ Equipment Set', 'Complete DJ setup with mixer, turntables, and speakers for events.', 85.00, 'Entertainment District', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  (gen_random_uuid(), 'Kayak with Paddle', 'Single-person kayak perfect for lake and river adventures. Life jacket included.', 30.00, 'Lakefront', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Outdoor' LIMIT 1), '00000000-0000-0000-0000-000000000000', true);

-- Insert demo reviews with proper UUIDs and listing references
DO $$
DECLARE
    listing_record RECORD;
BEGIN
    -- Loop through each listing and add some reviews
    FOR listing_record IN 
        SELECT id, title FROM listings 
        WHERE user_id = '00000000-0000-0000-0000-000000000000'
        LIMIT 8
    LOOP
        -- Add 1-2 reviews per listing
        INSERT INTO reviews (id, listing_id, reviewer_id, rating, comment) VALUES 
            (gen_random_uuid(), listing_record.id, '00000000-0000-0000-0000-000000000000', 
             4 + (random() * 1)::integer, 'Great item, exactly as described!'),
            (gen_random_uuid(), listing_record.id, '00000000-0000-0000-0000-000000000000', 
             4 + (random() * 1)::integer, 'Excellent quality and quick pickup.');
    END LOOP;
END $$;