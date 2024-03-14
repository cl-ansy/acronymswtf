import AuthForm from "@/components/react/Auth/AuthForm.tsx";

const Register = () => (
  <AuthForm
    postUrl="/api/auth/register"
    submitText="Register"
    passwordAutoComplete="new-password"
  />
);

export default Register;
