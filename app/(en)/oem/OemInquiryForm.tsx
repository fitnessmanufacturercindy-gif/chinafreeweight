"use client";

import { Send } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import LeadAttributionFields from "../../components/LeadAttributionFields";
import styles from "./OemPage.module.css";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  country: string;
  productCategory: string;
  quantity: string;
  company: string;
  buyerType: string;
  customization: string[];
  timing: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  country: "",
  productCategory: "",
  quantity: "",
  company: "",
  buyerType: "",
  customization: [],
  timing: "",
  message: "",
  website: ""
};

const customizationOptions = [
  "Logo & Marking",
  "Color & Finish",
  "KG / LB Marking",
  "Private Label Packaging",
  "Product Range Planning",
  "ODM / Tooling"
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,24}$/;

export default function OemInquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (window.location.search.includes("inquiry=sent")) {
      setStatus("success");
      setStatusMessage("Your OEM requirements were sent successfully. Our team will review the project details and contact you.");
    }
  }, []);

  function updateField(name: keyof FormValues, value: string | string[]) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function toggleCustomization(option: string) {
    const next = values.customization.includes(option)
      ? values.customization.filter((item) => item !== option)
      : [...values.customization, option];
    updateField("customization", next);
  }

  function validate() {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) nextErrors.email = "Please enter your business email.";
    else if (!emailPattern.test(values.email.trim())) nextErrors.email = "Please enter a valid business email address.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter your WhatsApp number.";
    else if (!phonePattern.test(values.phone.trim())) nextErrors.phone = "Use international format, for example +1 555 123 4567.";
    if (!values.country.trim()) nextErrors.country = "Please enter your country or region.";
    if (!values.productCategory) nextErrors.productCategory = "Please select a product category.";
    if (!values.quantity.trim()) nextErrors.quantity = "Please enter an estimated quantity.";
    if (values.website.trim()) nextErrors.website = "Spam check failed.";
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setStatus("error");
      setStatusMessage("Please complete the required project fields before submitting.");
      return;
    }
    setStatus("submitting");
    setStatusMessage("Sending your OEM requirements...");
  }

  return (
    <form
      id="oem-rfq-form"
      className={styles.form}
      action="https://formsubmit.co/kloe@powerbasefit.com"
      method="POST"
      onSubmit={handleSubmit}
      aria-label="OEM project inquiry form"
      noValidate
    >
      <input type="hidden" name="_subject" value="New OEM Project Inquiry from ChinaFreeWeight" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://www.chinafreeweight.com/oem?inquiry=sent#oem-rfq" />
      <input type="hidden" name="source" value="ChinaFreeWeight OEM and Private Label page" />
      <input type="hidden" name="customization_needs" value={values.customization.join(", ")} />
      <LeadAttributionFields language="en" />
      <input type="text" name="_honey" className={styles.honeypot} tabIndex={-1} autoComplete="off" />

      <div className={styles.formGrid}>
        <label>Name <span>*</span><input name="name" value={values.name} onChange={(e) => updateField("name", e.target.value)} aria-invalid={Boolean(errors.name)} autoComplete="name" required />{errors.name && <small>{errors.name}</small>}</label>
        <label>Business Email <span>*</span><input type="email" name="email" value={values.email} onChange={(e) => updateField("email", e.target.value)} aria-invalid={Boolean(errors.email)} autoComplete="email" placeholder="name@company.com" required />{errors.email && <small>{errors.email}</small>}</label>
        <label>WhatsApp <span>*</span><input type="tel" name="phone" value={values.phone} onChange={(e) => updateField("phone", e.target.value)} aria-invalid={Boolean(errors.phone)} autoComplete="tel" placeholder="+1 555 123 4567" required />{errors.phone && <small>{errors.phone}</small>}</label>
        <label>Country / Region <span>*</span><input name="country" value={values.country} onChange={(e) => updateField("country", e.target.value)} aria-invalid={Boolean(errors.country)} autoComplete="country-name" required />{errors.country && <small>{errors.country}</small>}</label>
        <label>Product Category <span>*</span><select name="productCategory" value={values.productCategory} onChange={(e) => updateField("productCategory", e.target.value)} aria-invalid={Boolean(errors.productCategory)} required><option value="">Select category</option><option>Dumbbells</option><option>Weight Plates</option><option>Bumper Plates</option><option>Gym Accessories</option><option>Mixed Product Range</option><option>New Product Development</option></select>{errors.productCategory && <small>{errors.productCategory}</small>}</label>
        <label>Estimated Quantity <span>*</span><input name="quantity" value={values.quantity} onChange={(e) => updateField("quantity", e.target.value)} aria-invalid={Boolean(errors.quantity)} placeholder="e.g. 500 pieces or 1 container" required />{errors.quantity && <small>{errors.quantity}</small>}</label>
        <label>Company<input name="company" value={values.company} onChange={(e) => updateField("company", e.target.value)} autoComplete="organization" /></label>
        <label>Buyer Type<select name="buyerType" value={values.buyerType} onChange={(e) => updateField("buyerType", e.target.value)}><option value="">Select buyer type</option><option>Distributor / Importer</option><option>Fitness Brand</option><option>Retailer</option><option>Commercial Gym Project</option><option>Wholesaler</option></select></label>
        <label>Target Timing<select name="timing" value={values.timing} onChange={(e) => updateField("timing", e.target.value)}><option value="">Select target timing</option><option>As soon as the sample is approved</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Planning for a later purchase</option></select></label>
      </div>

      <fieldset className={styles.checkGroup}>
        <legend>Customization Needs</legend>
        <div>{customizationOptions.map((option) => <label key={option}><input type="checkbox" checked={values.customization.includes(option)} onChange={() => toggleCustomization(option)} />{option}</label>)}</div>
      </fieldset>

      <label className={styles.messageField}>Project Details<textarea name="message" value={values.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Tell us the products, weight range, branding, packaging, destination market and any reference files you have." rows={6} /></label>
      <label className={styles.honeypot} aria-hidden="true">Website<input name="website" value={values.website} onChange={(e) => updateField("website", e.target.value)} tabIndex={-1} autoComplete="off" /></label>

      <button className={styles.submitButton} type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending..." : "Send My OEM Requirements"}<Send size={18} /></button>
      <p className={styles.privacy}>Your project information is used only to review and respond to this inquiry.</p>
      {statusMessage && <div className={`${styles.formStatus} ${status === "success" ? styles.success : styles.error}`} role="status">{statusMessage}</div>}
    </form>
  );
}
