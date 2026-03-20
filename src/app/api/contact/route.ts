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

    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Submissions";

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.warn("Airtable environment variables missing. Logging to console instead.");
      console.log("Contact Form Submission:", { name, email, message });
      
      // Simulate success for development if not configured
      return NextResponse.json({ 
        message: "Data logged to server (Airtable not configured).",
        submission: { name, email, message }
      });
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: name,
          Email: email,
          Message: message,
          Date: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Airtable API error");
    }

    // --- RESEND EMAIL NOTIFICATION ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio <onboarding@resend.dev>",
            to: email, // Optional: send receipt to sender
            bcc: "lakshaynarang6523@gmail.com", // User's email for notification
            subject: `New Transmission from ${name}`,
            html: `
              <div style="font-family: monospace; background: #03070f; color: #00ff94; padding: 20px; border: 1px solid #00ff94;">
                <h2>[NEW TRANSMISSION RECEIVED]</h2>
                <p><strong>RECIPIENT:</strong> Lakshay Narang</p>
                <p><strong>SENDER:</strong> ${name} &lt;${email}&gt;</p>
                <hr style="border: 0; border-top: 1px solid #00ff94;"/>
                <p><strong>MESSAGE DATA:</strong></p>
                <p>${message}</p>
                <hr style="border: 0; border-top: 1px solid #00ff94;"/>
                <p><em>This message was encrypted and routed via VOID.DEV Core.</em></p>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.error("Resend Notification Failed:", e);
      }
    }

    return NextResponse.json({ message: "Transmission encrypted and stored." });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
