import { ArrowRight, Mail, MessageCircle } from "lucide-react";

const sampleMessage = [
  "Hello PowerBaseFit, I would like to request a free sample.",
  "Product:",
  "Target quantity:",
  "Destination country:",
  "Logo or packaging requirements:"
].join("\n");

export const sampleWhatsAppHref = `https://wa.me/8618963018533?text=${encodeURIComponent(sampleMessage)}`;

export const sampleEmailHref = `mailto:kloe@powerbasefit.com?subject=${encodeURIComponent(
  "Free Sample Request from ChinaFreeWeight"
)}&body=${encodeURIComponent(sampleMessage)}`;

type FreeSampleCTAProps = {
  compact?: boolean;
  section: string;
};

export default function FreeSampleCTA({ compact = false, section }: FreeSampleCTAProps) {
  if (compact) {
    return (
      <a
        className="home-v3-button home-v3-button-primary"
        href={sampleWhatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        data-lead-type="free-sample"
        data-lead-channel="whatsapp"
        data-analytics-section={section}
      >
        Get a Free Sample <ArrowRight size={18} />
      </a>
    );
  }

  return (
    <div className="home-v3-sample-actions" aria-label="Free sample contact options">
      <a
        className="home-v3-sample-link home-v3-sample-link-primary"
        href={sampleWhatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        data-lead-type="free-sample"
        data-lead-channel="whatsapp"
        data-analytics-section={section}
      >
        <MessageCircle size={22} />
        <span>
          <small>Fast conversation</small>
          WhatsApp
        </span>
        <ArrowRight size={18} />
      </a>
      <a
        className="home-v3-sample-link"
        href={sampleEmailHref}
        data-lead-type="free-sample"
        data-lead-channel="email"
        data-analytics-section={section}
      >
        <Mail size={22} />
        <span>
          <small>Send product details</small>
          Email
        </span>
        <ArrowRight size={18} />
      </a>
    </div>
  );
}
