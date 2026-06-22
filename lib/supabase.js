import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://gbgkwwxzjkmdpdzfosau.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZ2t3d3h6amttZHBkemZvc2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwOTc3NDgsImV4cCI6MjA5NzY3Mzc0OH0.aDOMlfiRR4hHWKMPJrhoY72bsuBVinmw3Xh7p3wpKW8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);