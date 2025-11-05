-- Test schema integrity
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND column_name IN ('trialType', 'signupFlow', 'trialStartDate', 'trialEndDate', 'trialUsed', 'emailVerified')
ORDER BY column_name;