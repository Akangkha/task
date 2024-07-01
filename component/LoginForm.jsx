"use client";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function LoginForm({ onLogin ,extendSession}) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submit, setSubmit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit("");

    if (!executeRecaptcha) {
      console.log("Recaptcha not available");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("loginSubmit");

    const response = await axios.post("/api/recaptcha", {
      gRecaptchaToken,
      extendSession:extendSession,
    });

    if (response.data.success) {
      setSubmit("ReCaptcha Verified ");
      onLogin(response.data.expires);
    } else {
      setSubmit("Failed to verify ");
    }
  };

  return (
    <main>
      <h1 className="text-4xl text-center">Login</h1>
      <br />
      <form
        className="flex flex-col justify-start items-center gap-4"
        onSubmit={handleSubmit}
      >
        <button type="submit" className="border p-4 rounded bg-gray-900">
          Verify
        </button>
      </form>
      <p className="text-center">{submit}</p>
    </main>
  );
}
