"use client";
import LoginComponent from "@/components/Auth/Login";
import AuthRedirect from "@/lib/AuthRedirect";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginPage = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AuthRedirect requireAuth={false} redirectTo="/">
        <LoginComponent />
      </AuthRedirect>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
