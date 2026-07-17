import { MessageCircle } from "lucide-react";

const defaultMessage = "Hello, I am interested in your products. Please send me more details.";

export default function WhatsAppButton({
  label = "Chat with PowerBaseFit on WhatsApp",
  message = defaultMessage
}: {
  label?: string;
  message?: string;
}) {
  const whatsappUrl = `https://wa.me/8618963018533?text=${encodeURIComponent(message)}`;

  return (
    <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={label}>
      <MessageCircle size={30} strokeWidth={2.6} />
    </a>
  );
}
