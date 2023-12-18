import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { email, password } = req.body;
  const supabase = createRouteHandlerClient(/* Your Database type or configuration here */);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  // Redirect or send response as needed
  res.status(200).json({ message: "Login successful" });
}
