"use client";
import React, { useState, useEffect, Suspense } from "react";
import axiosInstance from "@/lib/axiosInstanse";
import { useParams } from "next/navigation";
import Navbar from "@/components/Header/Navbar";
import MaidDetailComponent from "@/components/Maid-Profile/Details";
import AuthRedirect from "@/lib/AuthRedirect";
import Loading from "@/app/[locale]/loading";

const Details = () => {
  const [maidDetails, setMaidDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const maidId = useParams().id;
  useEffect(() => {
    const fetchMaidDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(
          `api/v1/agentMaids/request/${maidId}`
        );
        setMaidDetails(response.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaidDetails();
  }, [maidId]);
  return (
    <AuthRedirect requireAuth={true}>
      <div>
        <Navbar />
        {isLoading && <div><Loading /></div>}
        {error && <div>Error: {error}</div>}
        <Suspense fallback={<Loading />}>
          {maidDetails && <MaidDetailComponent maid={maidDetails} />}
        </Suspense>
      </div>
    </AuthRedirect>
  );
};

export default Details;
