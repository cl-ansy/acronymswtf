import { useState } from "react";
import {
  useForm,
  type Path,
  type UseFormRegister,
  type SubmitHandler,
} from "react-hook-form";

import Submit from "@/components/react/Form/Submit.tsx";

type FormFields = {
  email: string;
  password: string;
};

export const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      window.location.replace("/dashboard");
    } catch (error: any) {
      setError("root.authError", {
        message: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <div>
        <label htmlFor="email" className="sr-only">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full flex-auto rounded-md border-0 bg-foreground/5 px-2.5 py-1.5
            text-foreground ring-1 ring-inset ring-foreground/10 focus:ring-2
            focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        />
        {errors.email && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full flex-auto rounded-md border-0 bg-foreground/5 px-2.5 py-1.5
            text-foreground ring-1 ring-inset ring-foreground/10 focus:ring-2
            focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
        />
        {errors.password && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {errors.root?.authError?.message && (
        <p className="text-[0.8rem] font-medium text-destructive">
          {errors.root.authError.message}
        </p>
      )}

      <Submit text="Sign in" loading={loading} />
    </form>
  );
};

export default AuthForm;
