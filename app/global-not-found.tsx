import type { Metadata } from "next";
import NotFound from "./components/NotFoundPage";
import "./globals.css";

export const metadata: Metadata = { title: "Page not found | PowerBaseFit" };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body><NotFound /></body>
    </html>
  );
}
