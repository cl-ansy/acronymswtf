import type { APIRoute } from "astro";
import { supabase } from "@/supabase/client";

type ReqBody = {
  email: string;
  password: string;
};

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const { email, password }: ReqBody = await request.json();

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return new Response(error.message, { status: error.status || 500 });
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
    return new Response(null, { status: 400 });
  }
};
