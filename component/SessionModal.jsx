"use client";
import React from "react";

export default function SessionModal({ onExtendSession, onLogout }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Session Expiring</h2>
        <p>Your session is about to expire. Do you want to extend it?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onExtendSession}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Extend Session
          </button>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
