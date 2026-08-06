"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import LeadAttributionFields from "./LeadAttributionFields";

type ProductRFQFormProps = {
  productName: string;
  productCategory: "Dumbbells" | "Weight Plates";
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  country: string;
  quantity: string;
  customization: string;
  message: string;
  website: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProductRFQForm({ productName, productCategory }: ProductRFQFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    country: "",
    quantity: "",
    customization: "",
    message: "",
    website: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function updateField(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (
      !values.name.trim() ||
      !emailPattern.test(values.email.trim()) ||
      !values.quantity.trim() ||
      values.website.trim()
    ) {
      event.preventDefault();
      setError("Please add your name, a valid business email, and the target quantity.");
      return;
    }

    setSubmitting(true);
  }

  return (
    <form
      className="product-rfq-form"
      action="https://formsubmit.co/kloe@powerbasefit.com"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="_subject" value={`Product RFQ: ${productName}`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://www.chinafreeweight.com/contact?inquiry=sent#inquiry" />
      <input type="hidden" name="source" value="Core product conversion page" />
      <input type="hidden" name="product" value={productName} />
      <input type="hidden" name="productCategory" value={productCategory} />
      <LeadAttributionFields language="en" />

      <label>
        Name *
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          autoComplete="name"
          required
        />
      </label>
      <label>
        Business email *
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="name@company.com"
          autoComplete="email"
          required
        />
      </label>
      <label>
        WhatsApp / phone
        <input
          type="tel"
          name="phone"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="+1 555 123 4567"
          autoComplete="tel"
        />
      </label>
      <label>
        Country / region
        <input
          type="text"
          name="country"
          value={values.country}
          onChange={(event) => updateField("country", event.target.value)}
          autoComplete="country-name"
        />
      </label>
      <label>
        Target quantity or set mix *
        <input
          type="text"
          name="quantity"
          value={values.quantity}
          onChange={(event) => updateField("quantity", event.target.value)}
          placeholder="e.g. 200 sets or one mixed container"
          required
        />
      </label>
      <label>
        Customization
        <select
          name="customization"
          value={values.customization}
          onChange={(event) => updateField("customization", event.target.value)}
        >
          <option value="">Select if needed</option>
          <option value="Standard product">Standard product</option>
          <option value="Custom logo">Custom logo</option>
          <option value="Private label packaging">Private label packaging</option>
          <option value="Custom color or marking">Custom color or marking</option>
        </select>
      </label>
      <label className="full">
        Requirements
        <textarea
          name="message"
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Weight range, logo, packing, destination port, target date, or inspection requirements."
        />
      </label>
      <label className="spam-field" aria-hidden="true">
        Website
        <input
          type="text"
          name="website"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Request Model-Specific Quote"} <Send size={19} />
      </button>
      {error ? <p className="product-rfq-error" role="alert">{error}</p> : null}
    </form>
  );
}
