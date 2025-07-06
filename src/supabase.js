import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xftrotkhzfsrhvwwwgyq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdHJvdGtoemZzcmh2d3d3Z3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODMxMDgsImV4cCI6MjA2NzM1OTEwOH0.e9Cw8q0DkcNcyutsEg9dBrTpol4cN-gNHebUhn2mHNo'

export const supabase = createClient(supabaseUrl, supabaseKey)
