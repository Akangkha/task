"use client";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function LoginForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submit, setSubmit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit("");

    if (!executeRecaptcha) {
      console.log("not available to execute recaptcha");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

    const response = await axios({
      method: "post",
      url: "/api/recaptcha",
      data: {
        gRecaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (response?.data?.success === true) {
      console.log(`Success with score: ${response?.data?.score}`);
      setSubmit("ReCaptcha Verified and Form Submitted!");
    } else {
      console.log(`Failure with score: ${response?.data?.score}`);
      setSubmit("Failed to verify recaptcha! You must be a robot!");
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
