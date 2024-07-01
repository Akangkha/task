"use client";
import React from "react";

const SessionModal = ({ onExtendSession, onLogout }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 rounded bg-black border ">
        <h2 className="text-lg">Session Timeout</h2>
        <p>Your session is about to expire ? </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onExtendSession}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Extend Session
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
