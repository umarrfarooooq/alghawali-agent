"use client";
import SignupComponent from "@/components/Auth/Signup";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthRedirect from "@/lib/AuthRedirect";

const SignUp = ({ params }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AuthRedirect requireAuth={false} redirectTo="/">
        <SignupComponent token={params.token}/>
      </AuthRedirect>
    </GoogleOAuthProvider>
  );
};

export default SignUp;
