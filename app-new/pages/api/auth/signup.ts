import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { NextApiRequest, NextApiResponse } from "next";

// import type { Database } from '@/lib/database.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password } = req.body;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<any>({
    cookies: () => cookieStore,
  });

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${req.headers.host}/auth/callback`,
    },
  });

  if (response.error) {
    res.status(400).json({ error: response.error.message });
    return;
  }

  res.status(200).json({ message: "Signup successful", user: response.user });
}
