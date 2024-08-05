"use client"
import Navbar from "@/components/Header/Navbar";
import AllMaids from "@/components/Maid-Profile/All-Maids";
import AuthRedirect from "@/lib/AuthRedirect";


export default function Home() {
  return (
    <>
      <AuthRedirect requireAuth={true}>
        <Navbar />
        <AllMaids />
      </AuthRedirect>
    </>
  );
}
