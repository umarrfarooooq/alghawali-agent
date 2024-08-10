"use client";
import RegisterComponent from "@/components/Auth/Register";
import { Toaster } from "@/components/ui/toaster";
import AuthRedirect from "@/lib/AuthRedirect";

const RegisterPage = () => {
  return (
      <AuthRedirect requireAuth={false} redirectTo="/">
        <RegisterComponent />
        <Toaster />
      </AuthRedirect>
  );
};

export default RegisterPage;
