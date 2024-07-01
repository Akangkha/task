"use client";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function LoginForm({ onLogin }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submit, setSubmit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit("");

    if (!executeRecaptcha) {
      console.log("Recaptcha not available");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

    try {
      const response = await axios.post("/api/recaptcha", { gRecaptchaToken }, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.success) {
        console.log(`Success with score: ${response.data.score}`);
        setSubmit("ReCaptcha Verified and Form Submitted!");
        onLogin(response.data.expires);
      } else {
        console.log(`Failure with score: ${response.data.score}`);
        setSubmit("Failed to verify recaptcha! You must be a robot!");
      }
    } catch (error) {
      console.error("Error during recaptcha verification:", error);
      setSubmit("Error during recaptcha verification.");
    }
  };

  return (
    <main>
      <h1 className="text-xl text-center">Login</h1>
      <br />
      <form
        className="flex flex-col justify-start items-center gap-4"
        onSubmit={handleSubmit}
      >
        <button
          type="submit"
          className="border p-4 text-lg rounded bg-gray-900"
        >
          Verify
        </button>
      </form>
      <p className="text-center">{submit}</p>
    </main>
  );
}
