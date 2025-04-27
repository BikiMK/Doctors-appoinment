import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mknsbxvjhrvsjaibpuvq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rbnNieHZqaHJ2c2phaWJwdXZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MDM5MjUsImV4cCI6MjA2MDI3OTkyNX0.IovYcp2RgjscD7e2jVXOpYiT_GcjRVU97HU6hTajCqk';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing in .env. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);