import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://gbgkwwxzjkmdpdzfosau.supabase.co/';
const SUPABASE_ANON_KEY = 'sb_publishable_cKhMBq989UClQ_efqlxvwg_0tC3Bd0Q';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);