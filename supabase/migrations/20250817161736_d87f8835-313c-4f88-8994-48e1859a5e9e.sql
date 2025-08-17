-- Try to insert demo listings again with better data
INSERT INTO listings (id, title, description, price, location, image_url, category_id, user_id, is_available) VALUES 
  ('demo-1', 'Canon EOS R5 DSLR Camera', 'Professional camera perfect for photography and videography. Includes battery and charger.', 45.00, 'Downtown', '/src/assets/camera-rental.jpg', (SELECT id FROM categories WHERE name = 'Photography' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  ('demo-2', 'DeWalt 20V Power Drill Set', 'Complete power drill set with bits and carrying case. Perfect for home projects.', 25.00, 'Midtown', '/src/assets/drill-rental.jpg', (SELECT id FROM categories WHERE name = 'Tools' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  ('demo-3', '4-Person Camping Tent', 'Spacious tent perfect for family camping trips. Waterproof and easy to set up.', 35.00, 'Suburbs', '/src/assets/tent-rental.jpg', (SELECT id FROM categories WHERE name = 'Outdoor' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  ('demo-4', 'MacBook Pro 16-inch', 'High-performance laptop perfect for creative work and presentations.', 65.00, 'University District', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  ('demo-5', 'Professional Mountain Bike', 'High-quality mountain bike perfect for trail adventures and city commuting.', 40.00, 'Riverside', 'https://images.unsplash.com/photo-1544191696-15693e32c669?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Sports' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  ('demo-6', 'Portable Generator', 'Reliable backup power solution for outdoor events and emergency situations.', 55.00, 'Industrial District', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Tools' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  ('demo-7', 'Professional DJ Equipment Set', 'Complete DJ setup with mixer, turntables, and speakers for events.', 85.00, 'Entertainment District', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), '00000000-0000-0000-0000-000000000000', true),
  ('demo-8', 'Kayak with Paddle', 'Single-person kayak perfect for lake and river adventures. Life jacket included.', 30.00, 'Lakefront', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop', (SELECT id FROM categories WHERE name = 'Outdoor' LIMIT 1), '00000000-0000-0000-0000-000000000000', true)
ON CONFLICT (id) DO NOTHING;

-- Insert demo reviews
INSERT INTO reviews (id, listing_id, reviewer_id, rating, comment) VALUES 
  ('review-1', 'demo-1', '00000000-0000-0000-0000-000000000000', 5, 'Amazing camera quality! Perfect for my photo shoot.'),
  ('review-2', 'demo-1', '00000000-0000-0000-0000-000000000000', 4, 'Great condition and easy pickup.'),
  ('review-3', 'demo-2', '00000000-0000-0000-0000-000000000000', 5, 'Powerful drill, completed my deck project perfectly.'),
  ('review-4', 'demo-3', '00000000-0000-0000-0000-000000000000', 5, 'Spacious tent, kept us dry during the rain.'),
  ('review-5', 'demo-4', '00000000-0000-0000-0000-000000000000', 4, 'Fast laptop, great for video editing work.'),
  ('review-6', 'demo-5', '00000000-0000-0000-0000-000000000000', 5, 'Smooth ride, perfect for mountain trails.'),
  ('review-7', 'demo-6', '00000000-0000-0000-0000-000000000000', 4, 'Reliable power source for our outdoor event.'),
  ('review-8', 'demo-7', '00000000-0000-0000-0000-000000000000', 5, 'Professional quality sound system!'),
  ('review-9', 'demo-8', '00000000-0000-0000-0000-000000000000', 4, 'Great kayak for beginners, very stable.')
ON CONFLICT (id) DO NOTHING;