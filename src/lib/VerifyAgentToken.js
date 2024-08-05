"use client";
import { jwtDecode } from "jwt-decode";

export const VerifyAgentToken = () => {
  if (typeof window === "undefined") {
    return { valid: false };
  }

  const agentToken = localStorage.getItem("agentToken");

  if (!agentToken) {
    return { valid: false };
  }

  try {
    const decoded = jwtDecode(agentToken);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      return { valid: false };
    }
    const agentId = decoded.id;
    const agentName = decoded.name;
    const agentRole = decoded.roles;

    return {
      valid: true,
      verifyToken: agentToken,
      agentId,
      agentName,
      agentRole,
    };
  } catch (error) {
    return { valid: false };
  }
};
