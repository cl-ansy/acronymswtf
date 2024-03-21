import { useState } from "react";
import {
  useForm,
  type Path,
  type UseFormRegister,
  type SubmitHandler,
} from "react-hook-form";

import { post } from "@/utils/network";
import Submit from "@/components/react/Form/Submit.tsx";

type AuthFormProps = {
  postUrl: string;
  submitText: string;
  passwordAutoComplete: string;
};

type FormFields = {
  email: string;
  password: string;
};

const Error = (props: { message: string }) => (
  <p className="text-[0.8rem] font-medium text-destructive">{props.message}</p>
);

export const AuthForm = ({
  postUrl,
  submitText,
  passwordAutoComplete,
}: AuthFormProps) => {
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
      await post(postUrl, data);
      window.location.replace("/");
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
          className="w-full flex-auto rounded border-0 bg-background px-2.5 py-1.5 text-foreground
            ring-1 ring-inset ring-foreground/10 placeholder:text-muted focus:ring-2
            focus:ring-inset focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50
            sm:text-sm sm:leading-6"
        />
        {errors.email && <Error message={errors.email.message!} />}
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          autoComplete={passwordAutoComplete}
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: 8,
            maxLength: 256,
          })}
          className="w-full flex-auto rounded border-0 bg-background px-2.5 py-1.5 text-foreground
            ring-1 ring-inset ring-foreground/10 placeholder:text-muted focus:ring-2
            focus:ring-inset focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50
            sm:text-sm sm:leading-6"
        />
        {errors.password && <Error message={errors.password.message!} />}
      </div>

      {errors.root?.authError && (
        <Error message={errors.root?.authError?.message!} />
      )}

      <Submit text={submitText} loading={loading} />
    </form>
  );
};

export default AuthForm;
