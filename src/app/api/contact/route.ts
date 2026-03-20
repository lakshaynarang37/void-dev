import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Incomplete data. Transmission aborted." },
        { status: 400 }
      );
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.warn("GOOGLE_SCRIPT_URL missing. Logging to console.");
      console.log("Contact Submission:", { name, email, message });
      return NextResponse.json({ message: "Transmission logged locally (Free mode ACTIVE)." });
    }

    // Route to Google Apps Script (100% Free Excel + Email)
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (!response.ok) {
      throw new Error("Free Backend Error");
    }

    return NextResponse.json({ message: "Transmission received and stored in Cloud." });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { message: "Mission Control error. Check connection." },
      { status: 500 }
    );
  }
}
