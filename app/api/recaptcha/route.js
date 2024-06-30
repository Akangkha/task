import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const secretKey = process.env.RECAPTCHA_SECRET;
 console.log("secretKey:", secretKey);
  const postData = await request.json();
  const { gRecaptchaToken } = postData;

  const formData = new URLSearchParams({
    secret: secretKey,
    response: gRecaptchaToken,
  }).toString();

  let res;

  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.error("Error during reCAPTCHA verification:", e.message);
    return NextResponse.json({ success: false });
  }

  if (res && res.data && res.data.success && res.data.score > 0.5) {
    console.log("res.data.score:", res.data.score);
    return NextResponse.json({
      success: true,
      score: res.data.score,
    });
  } else {
    return NextResponse.json({ success: false });
  }
}
