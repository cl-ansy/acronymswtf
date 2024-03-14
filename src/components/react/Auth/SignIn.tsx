import AuthForm from "@/components/react/Auth/AuthForm.tsx";

const SignIn = () => (
  <AuthForm
    postUrl="/api/auth/signin"
    submitText="Sign in"
    passwordAutoComplete="current-password"
  />
);

export default SignIn;
