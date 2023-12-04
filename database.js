const supabase = require("./node_modules/@supabase/supabase-js");
const supabaseUrl = "https://hxlylhbfposrezxzbnge.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bHlsaGJmcG9zcmV6eHpibmdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODY3ODYwMywiZXhwIjoyMDE0MjU0NjAzfQ.yyETrCGkCdYi-0K6yV3nfCaOHRlJ2ZJB2NWK8hBCHH8";
const supaClient = supabase.createClient(supabaseUrl, supabaseKey);

module.exports = { supaClient };
