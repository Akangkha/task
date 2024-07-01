import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET;
  const postData = await request.json();
  const { gRecaptchaToken } = postData;

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
      const expires = new Date(Date.now() + 3 * 60 * 1000).toISOString();
      return NextResponse.json(
        {
          success: true,
          score: res.data.score,
          expires,
        },
        {
          headers: {
            "Set-Cookie": `session=true; Path=/; HttpOnly; Max-Age=${3 * 60}`,
          },
        }
      );
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (e) {
    console.error("Error during reCAPTCHA verification:", e.message);
    return NextResponse.json({ success: false });
  }
}
