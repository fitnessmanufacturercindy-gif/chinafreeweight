"use client";

import { Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type FormValues = {
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
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  productCategory: "",
  quantity: "",
  projectType: "",
  productDemand: "",
  message: "",
  website: ""
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,24}$/;
const productCategories = [
  "Dumbbells",
  "Weight Plates",
  "Bumper Plates",
  "OEM",
  "Full Gym Solution"
];
const projectTypes = ["Gym Opening", "Distributor", "Retail", "OEM Brand"];

export default function InquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAt = useMemo(() => Date.now(), []);

  function updateField(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function validate() {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid business email address.";
    }

    if (!values.phone.trim()) {
      nextErrors.phone = "Please enter your phone or WhatsApp number.";
    } else if (!phonePattern.test(values.phone.trim())) {
      nextErrors.phone = "Use international format, e.g. +1 555 123 4567.";
    }

    if (values.website.trim()) {
      nextErrors.website = "Spam check failed.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please complete the required fields before submitting.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("Sending your inquiry...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          submittedFrom: "contact-page",
          elapsedMs: Date.now() - startedAt
        })
      });

      const result = (await response.json()) as { message?: string; emailSent?: boolean };

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setValues(initialValues);
      setStatus(result.emailSent === false ? "error" : "success");
      setStatusMessage(
        result.message || "Inquiry submitted and email sent successfully"
      );
    } catch {
      setStatus("error");
      setStatusMessage("Submission failed. Please try again or contact us by WhatsApp.");
    }
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit} noValidate>
      <label>
        Name <span className="required-mark">*</span>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Your full name"
          aria-invalid={Boolean(errors.name)}
          required
        />
        {errors.name && <small className="field-error">{errors.name}</small>}
      </label>

      <label>
        Email <span className="required-mark">*</span>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="name@company.com"
          aria-invalid={Boolean(errors.email)}
          required
        />
        {errors.email && <small className="field-error">{errors.email}</small>}
      </label>

      <label>
        WhatsApp / Phone <span className="required-mark">*</span>
        <input
          type="tel"
          name="phone"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="+1 555 123 4567"
          aria-invalid={Boolean(errors.phone)}
          required
        />
        {errors.phone && <small className="field-error">{errors.phone}</small>}
      </label>

      <label>
        Company Name
        <input
          type="text"
          name="company"
          value={values.company}
          onChange={(event) => updateField("company", event.target.value)}
          placeholder="Your company or gym name"
        />
      </label>

      <label>
        Country / Region
        <input
          type="text"
          name="country"
          value={values.country}
          onChange={(event) => updateField("country", event.target.value)}
          placeholder="United States / United Kingdom / Canada"
        />
      </label>

      <label>
        Product Demand
        <input
          type="text"
          name="productDemand"
          value={values.productDemand}
          onChange={(event) => updateField("productDemand", event.target.value)}
          placeholder="Dumbbells, weight plates, OEM, full gym solution..."
        />
      </label>

      <label>
        Product Category
        <select
          name="productCategory"
          value={values.productCategory}
          onChange={(event) => updateField("productCategory", event.target.value)}
        >
          <option value="">Select category</option>
          {productCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Estimated Quantity
        <input
          type="text"
          name="quantity"
          value={values.quantity}
          onChange={(event) => updateField("quantity", event.target.value)}
          placeholder="e.g. 200 sets / 1 container"
        />
      </label>

      <label>
        Project Type
        <select
          name="projectType"
          value={values.projectType}
          onChange={(event) => updateField("projectType", event.target.value)}
        >
          <option value="">Select project type</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="full">
        Message
        <textarea
          name="message"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Tell us quantity, logo needs, shipping country, budget, timeline, or gym project details."
        />
      </label>

      <label className="spam-field" aria-hidden="true">
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
          autoComplete="off"
        />
      </label>

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Get My Quotation"} <Send size={20} />
      </button>

      {statusMessage && (
        <div className={`form-status ${status}`} role="status">
          {statusMessage}
        </div>
      )}
    </form>
  );
}
