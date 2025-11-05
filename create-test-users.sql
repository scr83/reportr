-- Create test users for QA testing
INSERT INTO users (
  id, email, name, image, 
  plan, trialUsed, signupFlow, signupIp,
  createdAt, updatedAt, billingCycleStart
) VALUES 
(
  'test_free_user_001', 
  'qa.free.test@example.com', 
  'QA Free Test User', 
  'https://example.com/avatar.jpg',
  'FREE', 
  false, 
  'FREE', 
  '127.0.0.1',
  NOW(), 
  NOW(), 
  NOW()
),
(
  'test_paid_user_001', 
  'qa.paid.test@example.com', 
  'QA Paid Test User', 
  'https://example.com/avatar.jpg',
  'STARTER', 
  false, 
  'PAID_TRIAL', 
  '127.0.0.1',
  NOW(), 
  NOW(), 
  NOW()
);