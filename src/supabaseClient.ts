import { createClient } from '@supabase/supabase-js';

// 1. The URL is correct
const supabaseUrl = 'https://alevajxfkvnhuicfmpgr.supabase.co';

// 2. IMPORTANT: Go back to Supabase and copy the FULL key. 
// It should be much longer than the one below.
const supabaseAnonKey = 'PASTE_THE_FULL_LONG_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);