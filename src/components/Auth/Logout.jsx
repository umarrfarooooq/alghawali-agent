"use client";
import { LogOut } from "lucide-react";
import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
const Logout = () => {
  const [showModal, setShowModal] = useState(false);
  const handleLogoutButton = () => {
    localStorage.removeItem("agentToken");
    window.location.reload();
  };
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <Modal
        modalAction={handleLogoutButton}
        modalTxt={"Do you want to logout?"}
        confirmTxt={"Yes, Logout"}
        showModal={showModal}
        toggleModal={toggleModal}
      />
      <div className="logout fixed bottom-[25px] left-[25px] z-[5]">
        <button onClick={toggleModal} className="p-3 text-[#fff] bg-[#CD2424] rounded-lg text-base flex items-center gap-2">
          <LogOut />
          <span className="hidden sm:inline-block">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Logout;
