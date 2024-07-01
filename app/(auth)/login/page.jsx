"use client";
import { useState, useEffect } from "react";
import LoginForm from "@/component/LoginForm";
import SessionModal from "@/component/SessionModal";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(3 * 60);
  const [extendSession, setExtendSession] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isLoggedIn) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            setShowModal(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      const id = setTimeout(() => {
        setShowModal(true);
      }, remainingTime * 1000);
      setTimeoutId(id);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isLoggedIn, remainingTime]);

  const handleLogin = (expires) => {
    setIsLoggedIn(true);
    const duration = (new Date(expires) - new Date()) / 1000;
    resetTimer(duration);
  };

  const handleExtendSession = async () => {
    const newDuration = 5 * 60;
    handleLogin(new Date(Date.now() + newDuration * 1000).toISOString());
    setExtendSession(true);
    setRemainingTime(newDuration);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowModal(false);
    clearTimeout(timeoutId);
  };

  const resetTimer = (duration) => {
    clearTimeout(timeoutId);
    setRemainingTime(duration);

    const id = setTimeout(() => {
      setShowModal(true);
    }, duration * 1000);
    setTimeoutId(id);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_SITE_RECAPTCHA_KEY}
    >
      <div className="grid place-content-center h-screen">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} extendSession={extendSession} />
        ) : (
          <>
            <h1 className="text-xl text-center">You are logged in.</h1>
            <p className="text-center">
              Session expires in: {formatTime(remainingTime)}
            </p>
            {showModal && (
              <SessionModal
                onExtendSession={handleExtendSession}
                onLogout={handleLogout}
              />
            )}
          </>
        )}
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default Page;
