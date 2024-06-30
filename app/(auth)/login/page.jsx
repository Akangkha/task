"use client";
import LoginForm from "@/component/LoginForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Page = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_SITE_RECAPTCHA_KEY}>
      <div className="grid place-content-center h-screen">
        <LoginForm />
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Page;
