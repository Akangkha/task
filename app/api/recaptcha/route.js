import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET;
  const { gRecaptchaToken } = await request.json();

  const formData = new URLSearchParams({
    secret: secretKey,
    response: gRecaptchaToken,
  }).toString();

  try {
    const res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (res.data.success && res.data.score > 0.5) {
      return NextResponse.json({
        success: true,
        score: res.data.score,
      });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (e) {
    console.error("Error during reCAPTCHA verification:", e.message);
    return NextResponse.json({ success: false });
  }
}
