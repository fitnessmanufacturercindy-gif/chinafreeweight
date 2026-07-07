import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/8618963018533?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details.";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-button"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with PowerBaseFit on WhatsApp"
    >
      <MessageCircle size={30} strokeWidth={2.6} />
    </a>
  );
}
