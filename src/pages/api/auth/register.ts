import type { APIRoute } from "astro";
import { supabase } from "@/supabase/client";

type RegisterRequestBody = {
  email: string;
  password: string;
};

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const { email, password }: RegisterRequestBody = await request.json();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const { error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      return new Response(supabaseError.message, {
        status: supabaseError.status || 500,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Register success",
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
};
