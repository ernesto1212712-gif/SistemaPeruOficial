
import { createClient } from '@supabase/supabase-js';

// --- CLAVES DE CONEXIÓN ---
const SUPABASE_URL = "https://bffmrulbfmiqkbfdxsdr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZm1ydWxiZm1pcWtiZmR4c2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjg2MjQsImV4cCI6MjA4MDY0NDYyNH0.EmFHVMmEmMZQm-al-W8OcdhQ3l27JBT84KDqDemCdv0";

// ---------------------

let supabaseInstance = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("✅ Supabase conectado correctamente");
  } catch (error) {
    console.error("❌ Error iniciando Supabase:", error);
  }
} else {
  console.log("⚠️ Supabase no configurado. Usando modo local.");
}

export const supabase = supabaseInstance;
