import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  productCategory?: string;
  quantity?: string;
  projectType?: string;
  productDemand?: string;
  message?: string;
  website?: string;
  submittedFrom?: string;
  elapsedMs?: number;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,24}$/;
const resendEndpoint = "https://api.resend.com/emails";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailBody(inquiry: InquiryRecord) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["WhatsApp", inquiry.phone],
    ["Country", inquiry.country],
    ["Product Category", inquiry.productCategory],
    ["Quantity", inquiry.quantity],
    ["Project Type", inquiry.projectType],
    ["Message", inquiry.message]
  ];

  const text = rows.map(([label, value]) => `- ${label}: ${value || "-"}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border:1px solid #dedede;font-weight:700;background:#f7f7f7;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border:1px solid #dedede;">${escapeHtml(value || "-")}</td>
        </tr>`
    )
    .join("");

  return {
    text,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#151515;line-height:1.5;">
        <h2 style="margin:0 0 16px;">New Inquiry from Website</h2>
        <table style="border-collapse:collapse;width:100%;max-width:760px;">${htmlRows}</table>
      </div>`
  };
}

type InquiryRecord = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  productCategory: string;
  quantity: string;
  projectType: string;
  productDemand: string;
  message: string;
  submittedFrom: string;
  recipient: string;
  receivedAt: string;
};

async function saveInquiry(inquiry: InquiryRecord) {
  console.info("PowerBaseFit contact inquiry", inquiry);

  if (!process.env.CONTACT_WEBHOOK_URL) {
    return;
  }

  const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiry)
  });

  if (!response.ok) {
    throw new Error("Failed to save inquiry.");
  }
}

async function sendInquiryEmail(inquiry: InquiryRecord) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  const product = inquiry.productCategory || inquiry.productDemand || "General Inquiry";
  const country = inquiry.country || "Unknown Country";
  const subject = `New Inquiry from Website - ${country} - ${product}`;
  const body = buildEmailBody(inquiry);

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "powerbasefit-website/1.0"
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "PowerBaseFit Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL || "kloe@powerbasefit.com"],
      reply_to: inquiry.email,
      subject,
      text: body.text,
      html: body.html
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Resend email request failed.");
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const phone = clean(payload.phone);
  const honeypot = clean(payload.website);

  if (honeypot) {
    return NextResponse.json({ message: "Spam check failed." }, { status: 400 });
  }

  if (typeof payload.elapsedMs === "number" && payload.elapsedMs < 1200) {
    return NextResponse.json({ message: "Please try again." }, { status: 429 });
  }

  if (!name || !email || !phone) {
    return NextResponse.json(
      { message: "Name, email, and phone are required." },
      { status: 400 }
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
  }

  if (!phonePattern.test(phone)) {
    return NextResponse.json({ message: "Invalid phone number." }, { status: 400 });
  }

  const inquiry = {
    name,
    email,
    phone,
    company: clean(payload.company),
    country: clean(payload.country),
    productCategory: clean(payload.productCategory),
    quantity: clean(payload.quantity),
    projectType: clean(payload.projectType),
    productDemand: clean(payload.productDemand),
    message: clean(payload.message),
    submittedFrom: clean(payload.submittedFrom) || "contact-page",
    recipient: process.env.CONTACT_TO_EMAIL || "kloe@powerbasefit.com",
    receivedAt: new Date().toISOString()
  };

  try {
    await saveInquiry(inquiry);
  } catch {
    return NextResponse.json({ message: "Failed to save inquiry." }, { status: 502 });
  }

  try {
    await sendInquiryEmail(inquiry);
  } catch (error) {
    console.error("PowerBaseFit inquiry email failed", error);
    return NextResponse.json({
      message: "Inquiry saved but email failed",
      emailSent: false,
      recipient: inquiry.recipient
    });
  }

  return NextResponse.json({
    message: "Inquiry submitted and email sent successfully",
    emailSent: true,
    recipient: inquiry.recipient
  });
}
