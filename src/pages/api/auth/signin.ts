import type { APIRoute } from "astro";
import { supabase } from "@/supabase/client";

type SigninRequestBody = {
  email: string;
  password: string;
};

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password }: SigninRequestBody = await request.json();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const { data, error: supabaseError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (supabaseError) {
      return new Response(supabaseError.message, {
        status: supabaseError.status || 500,
      });
    }

    const { access_token, refresh_token } = data.session;
    cookies.set("sb-access-token", access_token, {
      path: "/",
    });
    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message: "Auth success",
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
};
