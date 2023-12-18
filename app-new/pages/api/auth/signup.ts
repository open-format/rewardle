// pages/api/auth/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password } = req.body;

  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    res.status(500).json({ error: "Supabase URL or Anon Key is undefined" });
    return;
  }
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const response = await supabase.auth.signUp({
    email,
    password,
  });

  const { data, error } = response;
  const user = data?.user;

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(200).json({ message: "Signup successful", user });
}
